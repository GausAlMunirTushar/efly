'use client'

import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import { useState } from 'react'

export default function VisaAssistanceForm() {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: ''
	})

	const [errors, setErrors] = useState({
		name: '',
		phone: '',
		email: ''
	})

	const [formStatus, setFormStatus] = useState<string | null>(null)

	// Handle form field changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	// Validate form
	const validateForm = () => {
		const newErrors: any = {}
		if (!formData.name) newErrors.name = 'Name is required'
		if (!formData.phone) newErrors.phone = 'Phone number is required'
		if (!formData.email) newErrors.email = 'Email is required'
		if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = 'Email is invalid'
		return newErrors
	}

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const validationErrors = validateForm()

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		// You can replace this with the actual API call
		try {
			console.log(formData)
			setFormStatus('Submitted successfully!')
		} catch (error) {
			setFormStatus('There was an error submitting the form.')
		}
	}

	return (
		<div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg'>
			<h2 className='text-2xl font-semibold text-center text-indigo-600'>
				Request Visa
			</h2>
			<p className='text-center text-gray-500 mb-6'>
				Please share your contact information. Our team will get in
				touch with you shortly.
			</p>

			<form onSubmit={handleSubmit} className='space-y-4'>
				{/* Name */}
				<div>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-700'
					>
						Name
					</label>
					<Input
						id='name'
						name='name'
						type='text'
						value={formData.name}
						onChange={handleInputChange}
						className='mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
						placeholder='Enter your name'
					/>
					{errors.name && (
						<p className='text-red-500 text-xs'>{errors.name}</p>
					)}
				</div>

				{/* Phone Number */}
				<div>
					<label
						htmlFor='phone'
						className='block text-sm font-medium text-gray-700'
					>
						Phone Number
					</label>
					<div className='flex items-center space-x-2'>
						<Input
							id='phone'
							name='phone'
							type='tel'
							value={formData.phone}
							onChange={handleInputChange}
							className='mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
							placeholder='+880 1XXX XXXXX'
							fullWidth
						/>
					</div>
					{errors.phone && (
						<p className='text-red-500 text-xs'>{errors.phone}</p>
					)}
				</div>

				{/* Email Address */}
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Email Address
					</label>
					<Input
						id='email'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleInputChange}
						className='mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
						placeholder='someone@example.com'
					/>
					{errors.email && (
						<p className='text-red-500 text-xs'>{errors.email}</p>
					)}
				</div>

				{/* Submit Button */}
				<div>
					<Button type='submit' variant='primary' className='w-full'>
						Submit
					</Button>
				</div>
			</form>

			{/* Form Status */}
			{formStatus && (
				<div className='mt-4 text-center text-green-500'>
					<p>{formStatus}</p>
				</div>
			)}
		</div>
	)
}
