'use client'

import { useState } from 'react'
import Input from '@/components/form/Input'
import TextArea from '@/components/form/TextArea'
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import Link from 'next/link'
import Button from '@/components/form/Button'

const ContactPage = () => {
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
			<div className='flex items-center justify-center bg-[#0058A8] h-40'>
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
								rows={8}
								value={formData.message}
								onChange={handleChange}
								required
								className='sm:max-h-44 2xl:max-h-32'
							/>
							<Button
								type='submit'
								className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'
								disabled={loading}
							>
								{loading ? 'Sending...' : 'Send Now'}
							</Button>
						</form>
					</div>

					{/* Right Side - Map and Address */}
					<div className='shadow-md rounded-lg'>
						<iframe
							className='w-full h-72 rounded-lg mb-2'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.101651784053!2d90.39153047533684!3d23.779394278650727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7680ce4c53b%3A0x6e0e2a7b69ebef2b!2sefly%20TRAVEL%20AGENCY!5e0!3m2!1sen!2sbd!4v1749619600516!5m2!1sen!2sbd'
							allowFullScreen
							loading='lazy'
						></iframe>
						<div className='p-4'>
							<h3 className='text-lg font-semibold mt-4'>
								📍 eFly Lounge (Dhaka):
							</h3>
							<p>
								Mohakhali DOHS, Road-30, House-437, 3rd Floor,
								Dhaka 1206.
							</p>

							{/* Contact Buttons */}
							<div className='flex flex-wrap gap-3 mt-6'>
								<Link
									href='https://wa.me/8801400054666'
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-md shadow hover:bg-teal-600 transition'
								>
									<FaWhatsapp />
									+880 1400-054666
								</Link>
								<Link
									href='tel:+8801400054777'
									className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition'
								>
									<FaPhoneAlt />
									+880 1400-054777
								</Link>
								<Link
									href='mailto:help.efly@gmail.com'
									className='flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition'
								>
									<FaEnvelope />
									help.efly@gmail.com
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactPage
