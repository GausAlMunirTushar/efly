'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import Input from '@/components/form/Input'
import Link from 'next/link'

const ForgotPassword = () => {
	const [email, setEmail] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle forgot password logic here
		console.log('Reset link sent to:', email)
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-100 dark:bg-bg_dark p-4'>
			<div className='w-full max-w-sm bg-white dark:bg-bg_dark box-shadow rounded-lg p-6'>
				<h2 className='text-2xl font-semibold text-center text-gray-900 dark:text-white'>
					Forgot Password 🔒
				</h2>
				<p className='text-center text-sm text-gray-600 dark:text-gray-400 mt-2'>
					{`Enter your email and we'll send you instructions to reset
					your password.`}
				</p>

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
					>
						Send Reset Link
					</button>
				</form>

				<div className='mt-4 text-center'>
					<Link
						href={`/login`}
						className='text-primary-500 hover:underline text-sm'
					>
						← Back to login
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword
