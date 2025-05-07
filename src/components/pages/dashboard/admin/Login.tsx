'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import Cookies from 'js-cookie'

const AdminLogin = () => {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			})

			const data = await res.json()

			if (!res.ok) {
				alert(data.error || 'Login failed')
				return
			}

			// Save in cookies
			Cookies.set('token', data.token)
			Cookies.set('email', data.user.email)
			Cookies.set('role', data.user.role)

			router.push('/admin/dashboard')
		} catch (err) {
			console.error(err)
			alert('Something went wrong. Please try again.')
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-100 dark:bg-body_dark'>
			<div className='w-full max-w-sm bg-white dark:bg-bg_dark dark:text-text-primary p-6 rounded-lg shadow-md my-5'>
				<div className='text-center'>
					<img
						src='/efly.png'
						alt='eFly Logo'
						className='py-4 h-20 mx-auto'
					/>
					<p className='text-gray-600 dark:text-text-secondary'>
						Welcome to eFly! 👋
					</p>
					<p className='text-sm text-gray-500 dark:text-text-secondary'>
						Please sign-in to your account and start the adventure
					</p>
				</div>
				<form onSubmit={handleSubmit} className='mt-6'>
					<Input
						label='Email or Phone'
						type='text'
						name='email'
						placeholder='johndoe@email.com'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						fullWidth
					/>
					<div className='mt-4'>
						<Input
							label='Password'
							type='password'
							name='password'
							placeholder='********'
							value={password}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setPassword(e.target.value)}
							fullWidth
						/>
					</div>
					<div className='flex items-center justify-between mt-4'>
						<label className='flex items-center'>
							<input
								type='checkbox'
								checked={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
								className='form-checkbox text-primary-600'
							/>
							<span className='ml-2 text-sm text-gray-600 dark:text-text-primary'>
								Remember me
							</span>
						</label>
						<Link
							href='/forgot-password'
							className='text-sm text-primary dark:text-text-primary hover:underline'
						>
							Forgot Password?
						</Link>
					</div>
					<Button
						type='submit'
						color='primary'
						className='w-full mt-6'
					>
						Login
					</Button>
				</form>
				<p className='mt-4 text-center text-sm text-gray-600 dark:text-text-secondary'>
					New on our platform?{' '}
					<Link
						href='/register'
						className='text-primary ml-4 dark:text-text-primary hover:underline'
					>
						Create an account
					</Link>
				</p>
			</div>
		</div>
	)
}

export default AdminLogin
