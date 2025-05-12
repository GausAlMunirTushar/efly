import { NextResponse } from 'next/server'
import { connectDatabase } from '@/configs/database'
import User from '@/models/user.model'
import { hashPassword } from '@/utils/hash' // To hash the new password

export async function POST(req: Request) {
	try {
		const { token, newPassword } = await req.json()
		await connectDatabase()

		// Find the user by reset token and check if the token is valid and not expired
		const user = await User.findOne({
			resetToken: token,
			resetTokenExpiration: { $gt: new Date() } // Ensure the token hasn't expired
		})

		if (!user) {
			return NextResponse.json(
				{ error: 'Invalid or expired token' },
				{ status: 400 }
			)
		}

		// Hash the new password
		const hashedPassword = await hashPassword(newPassword)

		// Update the password and clear the reset token
		user.password = hashedPassword
		user.resetToken = undefined
		user.resetTokenExpiration = undefined

		await user.save()

		return NextResponse.json(
			{ message: 'Password reset successfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
