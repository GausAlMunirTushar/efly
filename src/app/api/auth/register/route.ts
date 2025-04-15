import { NextResponse } from 'next/server'
import User from '@/models/user.model'
import { connectDatabase } from '@/configs/database'
import { hashPassword } from '@/utils/hash'

export async function POST(req: Request) {
	try {
		await connectDatabase()
		const { name, email, password } = await req.json()

		if (!name || !email || !password) {
			return NextResponse.json(
				{ error: 'All fields are required' },
				{ status: 400 }
			)
		}

		const existing = await User.findOne({ email })
		if (existing) {
			return NextResponse.json(
				{ error: 'Email already registered' },
				{ status: 400 }
			)
		}

		const hashedPassword = await hashPassword(password)

		const newUser = await User.create({
			email,
			password: hashedPassword,
			role: 'user'
		})

		return NextResponse.json(
			{ message: 'User registered', user: newUser },
			{ status: 201 }
		)
	} catch (error) {
		return NextResponse.json({ error: 'Server Error' }, { status: 500 })
	}
}
