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
		<section className='bg-white min-h-screen'>
			{/* Messages List */}
			<div className='p-4'>
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
