import { NextResponse } from 'next/server'
import User from '@/models/user.model'
import Otp from '@/models/otp.model'
import { connectDatabase } from '@/configs/database'
import { generateOtp, sendSms } from '@/utils/sms'

export async function POST(req: Request) {
	try {
		await connectDatabase()
		console.log('✅ Connected to DB')

		const { name, email, password, phone } = await req.json()
		console.log('📦 Payload:', { name, email, phone })

		if (!name || !email || !password || !phone) {
			console.log('⛔ Missing field')
			return NextResponse.json(
				{ error: 'All fields are required' },
				{ status: 400 }
			)
		}

		const existing = await User.findOne({ $or: [{ email }, { phone }] })
		if (existing) {
			console.log('⛔ User already exists')
			return NextResponse.json(
				{ error: 'Email or phone already registered' },
				{ status: 400 }
			)
		}

		const otp = generateOtp()
		console.log('🔐 Generated OTP:', otp)

		await sendSms({ phone, message: `Your OTP code is: ${otp}` })

		await Otp.create({
			phone,
			otp,
			expiresAt: new Date(Date.now() + 5 * 60 * 1000)
		})

		return NextResponse.json(
			{ message: 'OTP sent', phone },
			{ status: 200 }
		)
	} catch (error) {
		console.error('❌ Server error in register:', error)
		return NextResponse.json({ error: 'Server Error' }, { status: 500 })
	}
}
