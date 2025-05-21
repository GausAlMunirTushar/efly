'use client'

import { useState } from 'react'
import Input from '@/components/form/Input'
import TextArea from '@/components/form/TextArea'
import Button from '@/components/form/Button'

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
		phone: ''
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	// Handle input change
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		setSuccess('')

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			})

			const data = await res.json()

			if (res.ok) {
				setSuccess('Message sent successfully!')
				setFormData({ name: '', email: '', message: '', phone: '' })
			} else {
				setError(data.error || 'Something went wrong')
			}
		} catch (err) {
			setError('Server error. Please try again later.')
		}

		setLoading(false)
	}
	return (
		<section>
			{/* Success & Error Messages */}
			{error && <p className='text-red-500'>{error}</p>}
			{success && <p className='text-green-500'>{success}</p>}

			<form onSubmit={handleSubmit} className='space-y-4 mt-6'>
				<Input
					type='text'
					name='name'
					placeholder='Name'
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<Input
					type='email'
					name='email'
					placeholder='Email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<Input
					type='tel'
					name='phone'
					placeholder='Phone'
					value={formData.phone}
					onChange={handleChange}
					required
				/>
				<TextArea
					name='message'
					placeholder='Message'
					rows={4}
					value={formData.message}
					onChange={handleChange}
					required
					className=''
				/>
				<Button
					type='submit'
					className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'
					disabled={loading}
				>
					{loading ? 'Sending...' : 'Send Now'}
				</Button>
			</form>
		</section>
	)
}

export default ContactForm
