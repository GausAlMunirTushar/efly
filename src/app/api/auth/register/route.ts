import { NextResponse } from 'next/server'
import User from '@/models/user.model'
import Otp from '@/models/otp.model'
import { connectDatabase } from '@/configs/database'
import { generateOtp, sendSms } from '@/utils/sms'

export async function POST(req: Request) {
	try {
		await connectDatabase()
		const { name, email, password, phone } = await req.json()

		if (!name || !email || !password || !phone) {
			return NextResponse.json(
				{ error: 'All fields are required' },
				{ status: 400 }
			)
		}

		const existing = await User.findOne({ $or: [{ email }, { phone }] })
		if (existing) {
			return NextResponse.json(
				{ error: 'Email or phone already registered' },
				{ status: 400 }
			)
		}

		const otp = generateOtp()
		await sendSms({ phone, message: `Your OTP code is: ${otp}` })

		await Otp.create({
			phone,
			otp,
			expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
		})

		return NextResponse.json(
			{
				message:
					'OTP sent to phone. Please verify to complete registration.',
				phone
			},
			{ status: 200 }
		)

		// IMPORTANT:
		// Final user creation will happen in a separate `verify-otp` route after OTP match
	} catch (error) {
		return NextResponse.json({ error: 'Server Error' }, { status: 500 })
	}
}
