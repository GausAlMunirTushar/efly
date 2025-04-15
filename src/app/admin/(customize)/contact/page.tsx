'use client'

import { useState, useEffect } from 'react'
import getRelativeTime from '@/utils/getRelativeTime'

const statusOptions = [
	'new',
	'called',
	'no answer',
	'call back later',
	'not interested',
	'interested',
	'converted',
	'invalid number'
]

const statusStyles: Record<string, string> = {
	new: 'bg-blue-100 text-blue-800',
	called: 'bg-green-100 text-green-800',
	'no answer': 'bg-yellow-100 text-yellow-800',
	'call back later': 'bg-orange-100 text-orange-800',
	'not interested': 'bg-red-100 text-red-800',
	interested: 'bg-teal-100 text-teal-800',
	converted: 'bg-purple-100 text-purple-800',
	'invalid number': 'bg-gray-200 text-gray-800'
}

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
		phone: ''
	})
	const [messages, setMessages] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [page, setPage] = useState(1)
	const [total, setTotal] = useState(0)
	const limit = 10

	const fetchMessages = async () => {
		try {
			const res = await fetch(`/api/contact?page=${page}&limit=${limit}`)
			const data = await res.json()
			setMessages(data.contacts)
			setTotal(data.total)
		} catch (error) {
			setError('Error fetching messages')
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

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
				setFormData({ name: '', email: '', message: '', phone: '' })
				fetchMessages()
			} else {
				setError('Error sending message')
			}
		} catch (error) {
			setError('Server error')
		}
		setLoading(false)
	}

	const handleDelete = async (id: string) => {
		try {
			await fetch(`/api/contact/${id}`, { method: 'DELETE' })
			fetchMessages()
		} catch (error) {
			setError('Error deleting message')
		}
	}

	const handleCopyPhone = (phone: string) => {
		navigator.clipboard.writeText(phone)
		alert('Phone number copied to clipboard!')
	}

	const handleStatusChange = async (id: string, status: string) => {
		try {
			await fetch(`/api/contact/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status })
			})
			fetchMessages()
		} catch (error) {
			setError('Error updating status')
		}
	}

	useEffect(() => {
		fetchMessages()
	}, [page])

	const totalPages = Math.ceil(total / limit)

	return (
		<section className='bg-white min-h-screen rounded-xl'>
			<div className='p-4'>
				{error && <p className='text-red-500'>{error}</p>}

				{/* Message Grid */}
				<div className='grid md:grid-cols-4 gap-4'>
					{messages.length === 0 ? (
						<p>No messages yet</p>
					) : (
						messages.map(msg => (
							<div
								key={msg._id}
								className='bg-white shadow-md p-4 rounded-lg border'
							>
								<div className='flex justify-between items-center'>
									<h3 className='font-bold'>{msg.name}</h3>
									<p className='text-sm text-gray-500'>
										{getRelativeTime(msg.createdAt)}
									</p>
								</div>
								<p className='text-gray-600'>{msg.email}</p>
								<p className='mt-2 truncate'>{msg.message}</p>

								{/* Phone */}
								{msg.phone && (
									<div className='mt-2'>
										<p className='text-gray-800 flex justify-between items-center'>
											<span>
												<strong>Phone:</strong>{' '}
												{msg.phone}
											</span>
											<span
												className={`capitalize text-xs px-2 py-1 rounded ${statusStyles[msg.status] || 'bg-gray-100 text-gray-700'}`}
											>
												{msg.status || 'new'}
											</span>
										</p>
										<button
											onClick={() =>
												handleCopyPhone(msg.phone)
											}
											className='mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
										>
											Copy Phone
										</button>
									</div>
								)}

								<div className='flex justify-between items-center mt-4'>
									<button
										onClick={() => handleDelete(msg._id)}
										className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
									>
										Delete
									</button>
									<select
										value={msg.status}
										onChange={e =>
											handleStatusChange(
												msg._id,
												e.target.value
											)
										}
										className='border px-2 py-1 rounded'
									>
										{statusOptions.map(option => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
								</div>
							</div>
						))
					)}
				</div>

				{/* Pagination */}
				<div className='flex justify-center mt-6 space-x-2'>
					<button
						disabled={page === 1}
						onClick={() => setPage(p => p - 1)}
						className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
					>
						Prev
					</button>
					<span className='px-3 py-1'>{`Page ${page} of ${totalPages}`}</span>
					<button
						disabled={page === totalPages}
						onClick={() => setPage(p => p + 1)}
						className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
					>
						Next
					</button>
				</div>
			</div>
		</section>
	)
}

export default ContactPage
