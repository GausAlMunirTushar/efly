'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'

const ResetPassword = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [newPassword, setNewPassword] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [loading, setLoading] = useState(false)

	const token = searchParams.get('token')

	useEffect(() => {
		if (!token) {
			setError('Invalid or missing token.')
		}
	}, [token])

	const handlePasswordReset = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		setSuccess('')

		if (!newPassword) {
			setError('Password cannot be empty')
			setLoading(false)
			return
		}

		if (!token) {
			setError('Reset token is missing.')
			setLoading(false)
			return
		}

		try {
			const res = await fetch('/api/auth/reset-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token, newPassword })
			})

			const data = await res.json()

			if (!res.ok) {
				setError(data.error || 'Failed to reset password')
			} else {
				setSuccess('Password reset successfully! You can now log in.')
				setTimeout(() => router.push('/signin'), 2000)
			}
		} catch (err) {
			setError('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-100 dark:bg-bg_dark p-4'>
			<div className='w-full max-w-sm bg-white dark:bg-bg_dark box-shadow rounded-lg p-6'>
				<h2 className='text-2xl font-semibold text-center text-gray-900 dark:text-white'>
					Reset Password 🔑
				</h2>

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

				<form onSubmit={handlePasswordReset} className='mt-4 space-y-4'>
					<Input
						type='password'
						placeholder='Enter new password'
						value={newPassword}
						onChange={e => setNewPassword(e.target.value)}
						required
						className='w-full p-2 border rounded-md'
					/>
					<Button
						type='submit'
						className='w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-md transition'
						disabled={loading}
					>
						{loading ? 'Resetting...' : 'Reset Password'}
					</Button>
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

export default ResetPassword
