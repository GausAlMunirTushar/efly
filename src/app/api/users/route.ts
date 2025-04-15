import { NextResponse } from 'next/server'
import { connectDatabase } from '@/configs/database'
import User from '@/models/user.model'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
	try {
		await connectDatabase()
		const { name, email, password, role } = await req.json()

		if (!name || !email || !password) {
			return NextResponse.json(
				{ error: 'Missing fields' },
				{ status: 400 }
			)
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role: role || 'user'
		})

		return NextResponse.json(newUser, { status: 201 })
	} catch (error) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}

export async function GET() {
	try {
		await connectDatabase()
		const users = await User.find().sort({ createdAt: -1 })
		return NextResponse.json(users, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
