'use client'

import { useState } from 'react'

interface ApplyJobProps {
	jobId: string
}

export default function ApplyJob({ jobId }: ApplyJobProps) {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		portfolio: '',
		resume: '',
		coverLetter: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [message, setMessage] = useState('')

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		const payload = { ...formData, jobId }

		try {
			const response = await fetch('/api/apply', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			})

			const data = await response.json()
			if (response.ok) {
				setMessage('Application submitted successfully!')
			} else {
				setMessage(data.error || 'Something went wrong')
			}
		} catch (error) {
			setMessage('An error occurred. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg'>
			<h2 className='text-2xl font-bold mb-4'>Apply for Job</h2>
			{message && (
				<p className='mb-4 text-center text-lg text-green-500'>
					{message}
				</p>
			)}
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<input
						name='firstName'
						value={formData.firstName}
						onChange={handleChange}
						placeholder='First Name'
						className='border p-2 w-full rounded'
						required
					/>
				</div>
				<div>
					<input
						name='lastName'
						value={formData.lastName}
						onChange={handleChange}
						placeholder='Last Name'
						className='border p-2 w-full rounded'
						required
					/>
				</div>
				<div>
					<input
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
						placeholder='Email'
						className='border p-2 w-full rounded'
						required
					/>
				</div>
				<div>
					<input
						name='phone'
						value={formData.phone}
						onChange={handleChange}
						placeholder='Phone'
						className='border p-2 w-full rounded'
						required
					/>
				</div>
				<div>
					<input
						name='portfolio'
						value={formData.portfolio}
						onChange={handleChange}
						placeholder='Portfolio (Optional)'
						className='border p-2 w-full rounded'
					/>
				</div>
				<div>
					<input
						name='resume'
						value={formData.resume}
						onChange={handleChange}
						placeholder='Resume (Link or Upload)'
						className='border p-2 w-full rounded'
						required
					/>
				</div>
				<div>
					<textarea
						name='coverLetter'
						value={formData.coverLetter}
						onChange={handleChange}
						placeholder='Cover Letter (Optional)'
						className='border p-2 w-full rounded'
					/>
				</div>
				<div>
					<button
						type='submit'
						disabled={isSubmitting}
						className={`w-full p-2 rounded bg-blue-500 text-white ${isSubmitting ? 'opacity-50' : ''}`}
					>
						{isSubmitting ? 'Submitting...' : 'Submit Application'}
					</button>
				</div>
			</form>
		</div>
	)
}
