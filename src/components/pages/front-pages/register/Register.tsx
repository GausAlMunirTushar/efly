'use client'

import React, { useState } from 'react'
import { Mail, Lock, User, Phone, KeyRound } from 'lucide-react'
import Link from 'next/link'
import Input from '@/components/form/Input'
import { useRouter } from 'next/navigation'
import Button from '@/components/form/Button'

const Register: React.FC = () => {
	const router = useRouter()

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
		otp: ''
	})

	const [showOtp, setShowOtp] = useState(false)
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

		const { name, email, phone, password, confirmPassword } = formData

		if (!name || !email || !phone || !password || !confirmPassword) {
			setError('All fields are required')
			setLoading(false)
			return
		}

		if (!/^01[0-9]{9}$/.test(phone)) {
			setError('Invalid Bangladeshi phone number')
			setLoading(false)
			return
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match')
			setLoading(false)
			return
		}

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password, phone })
			})

			const data = await res.json()

			if (!res.ok) {
				setError(data.error || 'Registration failed')
			} else {
				setSuccess('OTP sent to your phone')
				setShowOtp(true)
			}
		} catch (err) {
			setError('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	const handleOtpVerify = async () => {
		setLoading(true)
		const { name, email, phone, password, otp } = formData

		if (!otp || otp.length !== 6) {
			setError('OTP must be 6 digits')
			setLoading(false)
			return
		}

		try {
			const res = await fetch('/api/auth/verify-otp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password, phone, otp })
			})

			const data = await res.json()

			if (!res.ok) {
				setError(data.error || 'OTP verification failed')
			} else {
				setSuccess('Registration complete! Redirecting to login...')
				setTimeout(() => router.push('/signin'), 2000)
			}
		} catch (err) {
			setError('Something went wrong during OTP verification')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-100'>
			<div className='bg-white p-6 rounded-xl shadow-md w-full max-w-sm my-5'>
				<h2 className='text-2xl font-semibold text-center'>Sign up</h2>
				<p className='text-gray-600 text-sm text-center'>
					Create an account to get started
				</p>

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
						label='Full Name'
						name='name'
						type='text'
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
						icon={Mail}
						fullWidth
						onChange={handleChange}
						value={formData.email}
						required
					/>
					<Input
						label='Phone Number'
						name='phone'
						type='tel'
						icon={Phone}
						fullWidth
						onChange={handleChange}
						value={formData.phone}
						required
					/>
					<Input
						label='Password'
						name='password'
						type='password'
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
						icon={Lock}
						fullWidth
						onChange={handleChange}
						value={formData.confirmPassword}
						required
					/>

					{showOtp && (
						<Input
							label='Enter OTP'
							name='otp'
							type='text'
							icon={KeyRound}
							fullWidth
							onChange={handleChange}
							value={formData.otp}
							maxLength={6}
							required
						/>
					)}

					{!showOtp ? (
						<Button
							type='submit'
							disabled={loading}
							className='w-full'
						>
							{loading ? 'Sending OTP...' : 'Register & Send OTP'}
						</Button>
					) : (
						<Button
							type='button'
							disabled={loading}
							className='w-full'
							onClick={handleOtpVerify}
						>
							{loading ? 'Verifying...' : 'Verify OTP & Register'}
						</Button>
					)}
				</form>

				<p className='text-sm text-center mt-4 space-x-3'>
					Already have an account?{' '}
					<Link
						href='/signin'
						className='text-primary hover:underline rounded-xl'
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Register
