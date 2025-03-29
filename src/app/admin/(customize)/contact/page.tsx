'use client'

import { useState, useEffect } from 'react'

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	})
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	// Fetch all messages
	const fetchMessages = async () => {
		try {
			const res = await fetch('/api/contact')
			const data = await res.json()
			setMessages(data)
		} catch (error) {
			setError('Error fetching messages')
		}
	}

	// Handle input change
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	// Submit form (Create message)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			})

			if (res.ok) {
				setFormData({ name: '', email: '', message: '' })
				fetchMessages() // Refresh messages
			} else {
				setError('Error sending message')
			}
		} catch (error) {
			setError('Server error')
		}

		setLoading(false)
	}

	// Delete message
	const handleDelete = async (id: string) => {
		try {
			await fetch(`/api/contact/${id}`, { method: 'DELETE' })
			fetchMessages() // Refresh messages
		} catch (error) {
			setError('Error deleting message')
		}
	}

	// Load messages on mount
	useEffect(() => {
		fetchMessages()
	}, [])

	return (
		<section className='container mx-auto p-6'>
			<h1 className='text-3xl font-bold text-center mb-6'>Contact Us</h1>

			{/* Contact Form */}
			<div className='max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg'>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						type='text'
						name='name'
						placeholder='Name'
						value={formData.name}
						onChange={handleChange}
						className='w-full p-2 border rounded-md'
						required
					/>
					<input
						type='email'
						name='email'
						placeholder='Email'
						value={formData.email}
						onChange={handleChange}
						className='w-full p-2 border rounded-md'
						required
					/>
					<textarea
						name='message'
						placeholder='Message'
						value={formData.message}
						onChange={handleChange}
						rows={4}
						className='w-full p-2 border rounded-md'
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

			{/* Messages List */}
			<div className='mt-10'>
				<h2 className='text-2xl font-semibold mb-4'>Messages</h2>

				{error && <p className='text-red-500'>{error}</p>}

				<div className='grid md:grid-cols-2 gap-4'>
					{messages.length === 0 ? (
						<p>No messages yet</p>
					) : (
						messages.map((msg: any) => (
							<div
								key={msg._id}
								className='bg-white shadow-md p-4 rounded-lg'
							>
								<h3 className='font-bold'>{msg.name}</h3>
								<p className='text-gray-600'>{msg.email}</p>
								<p className='mt-2'>{msg.message}</p>
								<button
									onClick={() => handleDelete(msg._id)}
									className='mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
								>
									Delete
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</section>
	)
}

export default ContactPage
