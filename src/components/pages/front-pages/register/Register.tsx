'use client'
import React, { useState } from 'react'
import { Mail, Lock, User } from 'lucide-react'
import Link from 'next/link'
import Input from '@/components/form/Input'

const Register: React.FC = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Add validation and API integration logic here
		console.log('Registering:', formData)
	}

	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-100'>
			<div className='bg-white p-6 rounded-lg box-shadow w-full max-w-md'>
				<h2 className='text-2xl font-semibold text-center mb-4'>
					Create an Account
				</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<Input
						label='Name'
						name='name'
						type='text'
						placeholder='Munir Tushar'
						icon={User}
						fullWidth
						onChange={handleChange}
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
						required
					/>
					<button
						type='submit'
						className='w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition-all'
					>
						Register
					</button>
				</form>
				<p className='text-sm text-center mt-4'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='text-primary-500 hover:underline'
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Register
