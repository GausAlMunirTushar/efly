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

		// ✅ Normalize phone to international format
		const normalizedPhone = phone.startsWith('880')
			? phone
			: phone.replace(/^0/, '880')

		const otp = generateOtp()
		const smsText = `
Welcome to efly

Your One-Time Password (OTP) is: ${otp}

This OTP will expire in 2 minutes.
Thank you for registering with efly.
`

		// ✅ Send using normalized phone number
		await sendSms({ phone: normalizedPhone, message: smsText })

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
