'use client'
import { useState } from 'react'
import { validateEmail, validatePhone, validateUrl } from '@/utils/validators'
import Input from '@/components/form/Input'
import Title from '@/components/common/Title'
import Button from '@/components/form/Button'

type ErrorState = {
	about?: string
	address?: string
	phone?: string
	email?: string
	facebook?: string
	linkedin?: string
	twitter?: string
	youtube?: string
	instagram?: string
	general?: string // Added the general field
}

const SettingsPage = () => {
	const [formData, setFormData] = useState({
		about: '',
		address: '',
		phone: '',
		email: '',
		facebook: '',
		linkedin: '',
		twitter: '',
		youtube: '',
		instagram: ''
	})
	const [error, setError] = useState<ErrorState>({
		about: '',
		address: '',
		phone: '',
		email: '',
		facebook: '',
		linkedin: '',
		twitter: '',
		youtube: '',
		instagram: ''
	})
	const [loading, setLoading] = useState(false)
	const [successMessage, setSuccessMessage] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setSuccessMessage('')
		const errors = validateForm(formData)
		if (Object.keys(errors).length > 0) {
			setError(errors)
			setLoading(false)
			return
		}

		// Submit form data to API
		try {
			// Placeholder for API call
			setTimeout(() => {
				setLoading(false)
				setSuccessMessage('Settings updated successfully!')
			}, 1500)
		} catch (err) {
			setLoading(false)
			setError({ general: 'Failed to update settings' }) // Now "general" is valid
		}
	}

	const validateForm = (data: any) => {
		const newErrors: ErrorState = {} // Explicitly using the ErrorState type
		if (!data.email || !validateEmail(data.email))
			newErrors.email = 'Invalid email'
		if (!data.phone || !validatePhone(data.phone))
			newErrors.phone = 'Invalid phone number'
		if (data.facebook && !validateUrl(data.facebook))
			newErrors.facebook = 'Invalid URL'
		if (data.linkedin && !validateUrl(data.linkedin))
			newErrors.linkedin = 'Invalid URL'
		if (data.twitter && !validateUrl(data.twitter))
			newErrors.twitter = 'Invalid URL'
		if (data.youtube && !validateUrl(data.youtube))
			newErrors.youtube = 'Invalid URL'
		if (data.instagram && !validateUrl(data.instagram))
			newErrors.instagram = 'Invalid URL'
		return newErrors
	}

	return (
		<div className='w-full mx-auto p-4 bg-white box-shadow dark:bg-bg_dark rounded-lg'>
			<Title>Settings</Title>
			{successMessage && (
				<div className='bg-green-100 text-green-800 p-4 rounded-lg mb-4'>
					{successMessage}
				</div>
			)}
			{error.general && (
				<div className='bg-red-100 text-red-800 p-4 rounded-lg mb-4'>
					{error.general}
				</div>
			)}

			<form onSubmit={handleSubmit} className='space-y-6 mt-4'>
				<div className='space-y-4'>
					<Input
						label='About'
						name='about'
						value={formData.about}
						onChange={handleChange}
						error={error.about}
						fullWidth
						className='h-14'
						placeholder='Enter a brief description about bijoyair'
					/>
					<Input
						label='Address'
						name='address'
						value={formData.address}
						onChange={handleChange}
						error={error.address}
						fullWidth
						placeholder='Enter your address'
					/>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<Input
							label='Phone'
							name='phone'
							value={formData.phone}
							onChange={handleChange}
							error={error.phone}
							fullWidth
							placeholder='Enter your phone number'
						/>
						<Input
							label='Email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							error={error.email}
							fullWidth
							placeholder='Enter your email address'
						/>
					</div>
				</div>

				{/* Social Media Links */}
				<div className='space-y-4'>
					<h2 className='text-xl font-medium'>Social Media Links</h2>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
						<Input
							label='Facebook'
							name='facebook'
							value={formData.facebook}
							onChange={handleChange}
							error={error.facebook}
							placeholder='Enter your Facebook profile URL'
						/>
						<Input
							label='LinkedIn'
							name='linkedin'
							value={formData.linkedin}
							onChange={handleChange}
							error={error.linkedin}
							placeholder='Enter your LinkedIn profile URL'
						/>
						<Input
							label='Twitter'
							name='twitter'
							value={formData.twitter}
							onChange={handleChange}
							error={error.twitter}
							placeholder='Enter your Twitter profile URL'
						/>
						<Input
							label='YouTube'
							name='youtube'
							value={formData.youtube}
							onChange={handleChange}
							error={error.youtube}
							placeholder='Enter your YouTube profile URL'
						/>
						<Input
							label='Instagram'
							name='instagram'
							value={formData.instagram}
							onChange={handleChange}
							error={error.instagram}
							placeholder='Enter your Instagram profile URL'
						/>
					</div>
				</div>

				{/* Save Button */}
				<div className='flex justify-end'>
					<Button type='submit' disabled={loading}>
						{loading ? 'Saving...' : 'Save Changes'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SettingsPage
