'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import Input from '@/components/form/Input'
import Link from 'next/link'

const ForgotPassword = () => {
	const [email, setEmail] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		setSuccess('')

		try {
			const res = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			})

			const data = await res.json()

			if (!res.ok) {
				setError(data.error || 'Failed to send reset email')
			} else {
				setSuccess('Password reset link sent! Check your inbox.')
			}
		} catch (err) {
			setError('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex items-center justify-center bg-gray-100 dark:bg-bg_dark p-4'>
			<div className='w-full max-w-sm bg-white dark:bg-bg_dark shadow rounded-lg p-6'>
				<img
					src='/efly.png'
					alt='eFly Logo'
					className='py-4 h-20 mx-auto'
				/>
				<p className='text-center text-sm text-gray-600 dark:text-gray-400 mt-2'>
					{`Enter your email and we'll send you instructions to reset your password.`}
				</p>

				{error && (
					<p className='text-red-500 text-sm text-center mt-2'>
						{error}
					</p>
				)}
				{success && (
					<p className='text-green-500 text-sm text-center mt-2'>
						{success}
					</p>
				)}

				<form onSubmit={handleSubmit} className='mt-4 space-y-4'>
					<Input
						label='Email'
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						icon={Mail}
						placeholder='Enter your email'
						required
						fullWidth
					/>

					<button
						type='submit'
						className='w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-md transition'
						disabled={loading}
					>
						{loading ? 'Sending reset link...' : 'Send Reset Link'}
					</button>
				</form>

				<div className='mt-4 text-center'>
					<Link
						href={`/signin`}
						className='text-primary-500 hover:underline text-sm'
					>
						← Back to Sign In
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword
