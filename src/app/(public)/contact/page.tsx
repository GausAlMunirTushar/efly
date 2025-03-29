'use client'

import { useState } from 'react'
import Input from '@/components/form/Input'
import TextArea from '@/components/form/TextArea'

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
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
				setFormData({ name: '', email: '', message: '' }) // Reset form
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
			<div className='flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 h-36'>
				<h1 className='text-4xl font-bold text-white'>Contact Us</h1>
			</div>
			<div className='container mx-auto p-6'>
				<div className='grid md:grid-cols-2 gap-6'>
					{/* Left Side - Contact Form */}
					<div className='bg-white shadow-md p-6 rounded-lg'>
						<p className='mb-4 text-gray-600'>
							Reach out to us via email or connect directly by
							phone. For a personalized touch, visit us in person
							and discuss your travel plans.
						</p>

						{/* Success & Error Messages */}
						{error && <p className='text-red-500'>{error}</p>}
						{success && <p className='text-green-500'>{success}</p>}

						<form
							onSubmit={handleSubmit}
							className='space-y-4 mt-6'
						>
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
							<TextArea
								name='message'
								placeholder='Message'
								rows={4}
								value={formData.message}
								onChange={handleChange}
								required
							/>
							<button
								type='submit'
								className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'
								disabled={loading}
							>
								{loading ? 'Sending...' : 'Send Now'}
							</button>
						</form>
					</div>

					{/* Right Side - Map and Address */}
					<div className='shadow-md rounded-lg'>
						<iframe
							className='w-full h-60 rounded-lg mb-4'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9020684300725!2d90.3984!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x123456789abcdef!2sITS%20Holidays%20Ltd.!5e0!3m2!1sen!2sbd!4v1631234567890'
							allowFullScreen
							loading='lazy'
						></iframe>
						<div className='p-4'>
							<h3 className='text-lg font-semibold'>Email:</h3>
							<p>efly@gmail.com</p>
							<h3 className='text-lg font-semibold mt-4'>
								📍 eFly Lounge (Dhaka):
							</h3>
							<p>
								Mohakhali DOHS, Road-30, House-437, 3rd Floor,
								Dhaka 1206.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactPage
