'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import Input from '@/components/form/Input'

export default function ChangePassword() {
	const [formData, setFormData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	})

	const [errors, setErrors] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
		setErrors(prev => ({ ...prev, [e.target.name]: '' }))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const { currentPassword, newPassword, confirmPassword } = formData
		const newErrors = {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		}

		if (!currentPassword) newErrors.currentPassword = 'Required'
		if (!newPassword) newErrors.newPassword = 'Required'
		if (newPassword && newPassword.length < 6)
			newErrors.newPassword = 'Must be at least 6 characters'
		if (confirmPassword !== newPassword)
			newErrors.confirmPassword = 'Passwords do not match'

		setErrors(newErrors)

		const hasError = Object.values(newErrors).some(error => error)
		if (!hasError) {
			// Perform API call or submit logic here
			console.log('Change password:', formData)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 w-full max-w-4xl bg-white p-4 rounded-lg mx-auto'
		>
			<Input
				label='Current Password'
				name='currentPassword'
				type='password'
				required
				fullWidth
				value={formData.currentPassword}
				onChange={handleChange}
				error={errors.currentPassword}
				icon={Lock}
			/>

			<Input
				label='New Password'
				name='newPassword'
				type='password'
				required
				fullWidth
				value={formData.newPassword}
				onChange={handleChange}
				error={errors.newPassword}
				icon={Lock}
			/>

			<Input
				label='Confirm New Password'
				name='confirmPassword'
				type='password'
				required
				fullWidth
				value={formData.confirmPassword}
				onChange={handleChange}
				error={errors.confirmPassword}
				icon={Lock}
			/>

			<button
				type='submit'
				className='w-full bg-primary text-white py-2 rounded-md font-semibold transition'
			>
				Change Password
			</button>
		</form>
	)
}
