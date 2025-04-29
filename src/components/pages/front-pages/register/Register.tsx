'use client'

import React, { useState } from 'react'
import { Mail, Lock, User } from 'lucide-react'
import Link from 'next/link'
import Input from '@/components/form/Input'
import { useRouter } from 'next/navigation'
import Button from '@/components/form/Button'

const Register: React.FC = () => {
	const router = useRouter()

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [loading, setLoading] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setSuccess('')
		setLoading(true)

		const { name, email, password, confirmPassword } = formData

		if (password !== confirmPassword) {
			setError('Passwords do not match')
			setLoading(false)
			return
		}

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password })
			})

			const data = await res.json()

			if (!res.ok) {
				setError(data.error || 'Registration failed')
			} else {
				setSuccess('Registration successful! Redirecting to login...')
				setTimeout(() => router.push('/admin/login'), 2000)
			}
		} catch (err) {
			setError('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-100'>
			<div className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm'>
				<h2 className='text-2xl font-semibold text-center mb-4'>
					Create an Account
				</h2>

				{error && (
					<p className='text-red-500 text-sm text-center'>{error}</p>
				)}
				{success && (
					<p className='text-green-600 text-sm text-center'>
						{success}
					</p>
				)}

				<form onSubmit={handleSubmit} className='space-y-4 mt-2'>
					<Input
						label='Name'
						name='name'
						type='text'
						placeholder='Munir Tushar'
						icon={User}
						fullWidth
						onChange={handleChange}
						value={formData.name}
						required
					/>
					<Input
						label='Email'
						name='email'
						type='email'
						placeholder='tushar@email.com'
						icon={Mail}
						fullWidth
						onChange={handleChange}
						value={formData.email}
						required
					/>
					<Input
						label='Password'
						name='password'
						type='password'
						placeholder='********'
						icon={Lock}
						fullWidth
						onChange={handleChange}
						value={formData.password}
						required
					/>
					<Input
						label='Confirm Password'
						name='confirmPassword'
						type='password'
						placeholder='********'
						icon={Lock}
						fullWidth
						onChange={handleChange}
						value={formData.confirmPassword}
						required
					/>

					<Button
						type='submit'
						disabled={loading}
						className='w-full bg-primary text-white py-2 rounded-md hover:bg-primary transition-all disabled:opacity-50'
					>
						{loading ? 'Registering...' : 'Register'}
					</Button>
				</form>

				<p className='text-sm text-center mt-4 space-x-3'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='text-primary hover:underline'
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Register
