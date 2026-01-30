import { NextResponse } from 'next/server'
import { connectDatabase } from '@/configs/database'
import User from '@/models/user.model'
import { sendEmail } from '@/utils/email'
import crypto from 'crypto'

export async function POST(req: Request) {
	try {
		const { email } = await req.json()
		await connectDatabase()

		// Find the user by email
		const user = await User.findOne({ email })
		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			)
		}

		// Generate a password reset token
		const resetToken = crypto.randomBytes(32).toString('hex')
		const resetTokenExpiration = new Date(Date.now() + 3600000) // 1 hour expiration

		// Store the token and its expiration in the user's record
		user.resetToken = resetToken
		user.resetTokenExpiration = resetTokenExpiration
		await user.save()

		// Send the reset token via email
		const resetLink = `https://bijoyair.com.bd/reset-password?token=${resetToken}`

		await sendEmail(
			email,
			'Password Reset Request',
			`<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`
		)

		return NextResponse.json(
			{ message: 'Password reset email sent' },
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
