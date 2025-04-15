import { NextResponse } from 'next/server'
import User from '@/models/user.model'
import { connectDatabase } from '@/configs/database'
import { comparePassword } from '@/utils/hash'
import { signToken } from '@/utils/auth'

export async function POST(req: Request) {
	try {
		await connectDatabase()
		const { email, password } = await req.json()

		const user = await User.findOne({ email })
		if (!user)
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 401 }
			)

		const match = await comparePassword(password, user.password)
		if (!match)
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 401 }
			)

		const token = signToken({ id: user._id, role: user.role })

		return NextResponse.json(
			{ message: 'Login successful', token, user },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ error: 'Server Error' }, { status: 500 })
	}
}
