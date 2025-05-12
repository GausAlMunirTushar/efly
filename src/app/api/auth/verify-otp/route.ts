import { NextResponse } from 'next/server'
import User from '@/models/user.model'
import Otp from '@/models/otp.model'
import { connectDatabase } from '@/configs/database'
import { hashPassword } from '@/utils/hash'

export async function POST(req: Request) {
	try {
		await connectDatabase()
		const { name, email, phone, password, otp } = await req.json()

		const otpRecord = await Otp.findOne({ phone }).sort({ createdAt: -1 })
		if (
			!otpRecord ||
			otpRecord.otp !== otp ||
			otpRecord.expiresAt < new Date()
		) {
			return NextResponse.json(
				{ error: 'Invalid or expired OTP' },
				{ status: 400 }
			)
		}

		const hashedPassword = await hashPassword(password)

		const user = await User.create({
			name,
			email,
			phone,
			password: hashedPassword,
			role: 'user'
		})

		await Otp.deleteMany({ phone })

		return NextResponse.json(
			{ message: 'User registered successfully', user },
			{ status: 201 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
