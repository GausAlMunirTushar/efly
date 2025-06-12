'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Mail, Lock, User, Phone, KeyRound } from 'lucide-react'
import Link from 'next/link'
import Input from '@/components/form/Input'
import { useRouter } from 'next/navigation'
import Button from '@/components/form/Button'
import OtpInput from '@/components/form/OtpInput'

const Register: React.FC = () => {
	const router = useRouter()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		password: '',
		otp: ''
	})

	const [showOtp, setShowOtp] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [loading, setLoading] = useState(false)

	const otpInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (showOtp && otpInputRef.current) {
			otpInputRef.current.focus()
		}
	}, [showOtp])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		// For OTP, restrict non-numeric chars
		if (name === 'otp') {
			const numericValue = value.replace(/\D/g, '')
			setFormData({ ...formData, [name]: numericValue })
		} else {
			setFormData({ ...formData, [name]: value })
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setSuccess('')
		setLoading(true)

		const { name, email, phone, password } = formData

		if (
			!name.trim() ||
			!email.trim() ||
			!phone.trim() ||
			!password.trim()
		) {
			setError('All fields are required')
			setLoading(false)
			return
		}

		if (!/^01[0-9]{9}$/.test(phone)) {
			setError('Invalid Bangladeshi phone number')
			setLoading(false)
			return
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters')
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
		} catch {
			setError('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	const handleOtpVerify = async () => {
		setError('')
		setSuccess('')
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
		} catch {
			setError('Something went wrong during OTP verification')
		} finally {
			setLoading(false)
		}
	}

	// Optional: auto-submit OTP when 6 digits entered
	useEffect(() => {
		if (showOtp && formData.otp.length === 6 && !loading) {
			handleOtpVerify()
		}
	}, [formData.otp])

	return (
		<main
			className='flex justify-center items-center bg-gray-100 py-8'
			aria-live='polite'
		>
			<section
				className='bg-white p-6 rounded-xl shadow-md w-full max-w-sm'
				aria-label='Registration form'
			>
				<h1 className='text-2xl font-semibold text-center mb-2'>
					Sign Up
				</h1>
				<p className='text-gray-600 text-sm text-center mb-4'>
					Create an account to get started
				</p>

				{error && (
					<p
						role='alert'
						className='text-red-600 text-sm text-center mb-2'
						aria-live='assertive'
					>
						{error}
					</p>
				)}
				{success && (
					<p
						role='status'
						className='text-green-600 text-sm text-center mb-2'
						aria-live='polite'
					>
						{success}
					</p>
				)}

				<form
					onSubmit={showOtp ? e => e.preventDefault() : handleSubmit}
					noValidate
					aria-describedby={error ? 'error-msg' : undefined}
					className='space-y-2'
				>
					{!showOtp && (
						<>
							<Input
								label='Full Name'
								name='name'
								type='text'
								icon={User}
								fullWidth
								onChange={handleChange}
								value={formData.name}
								required
								autoComplete='name'
								placeholder='John Doe'
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
								autoComplete='email'
								placeholder='mail@efly.com.bd'
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
								autoComplete='tel'
								pattern='01[0-9]{9}'
								title='Bangladeshi phone number'
								placeholder='01XXXXXXXXX'
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
								autoComplete='new-password'
								minLength={6}
								placeholder='********'
							/>
						</>
					)}

					{showOtp && (
						<OtpInput
							length={6}
							value={formData.otp}
							onChange={otp => setFormData({ ...formData, otp })}
							autoFocus
						/>
					)}

					{!showOtp ? (
						<Button
							type='submit'
							disabled={loading}
							className='w-full mt-4 transition-colors duration-300'
							aria-disabled={loading}
						>
							{loading ? 'Sending OTP...' : 'Register'}
						</Button>
					) : (
						<Button
							type='button'
							disabled={loading}
							className='w-full mt-4 transition-colors duration-300'
							onClick={handleOtpVerify}
							aria-disabled={loading}
						>
							{loading ? 'Verifying...' : 'Verify OTP'}
						</Button>
					)}
				</form>

				<p className='text-sm text-center mt-4'>
					Already have an account?{' '}
					<Link
						href='/signin'
						className='text-primary hover:underline rounded-xl'
					>
						Login
					</Link>
				</p>
			</section>
		</main>
	)
}

export default Register
