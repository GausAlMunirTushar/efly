'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/form/Button'

interface ApplyJobProps {
	params: Promise<{ id: string }>
}

export default function ApplyJob({ params }: ApplyJobProps) {
	const router = useRouter()
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		portfolio: '',
		resume: '',
		coverLetter: ''
	})
	const [resumeFile, setResumeFile] = useState<File | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false) // New state
	const [message, setMessage] = useState('')

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setResumeFile(e.target.files[0])
		}
	}

	const uploadResume = async () => {
		if (!resumeFile) return ''
		const form = new FormData()
		form.append('file', resumeFile)

		const res = await fetch('/api/upload', {
			method: 'POST',
			body: form
		})
		const data = await res.json()
		if (!res.ok) throw new Error(data.error || 'Resume upload failed')
		return data.imageUrl
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setMessage('')

		try {
			const resolvedParams = await params
			let resumeUrl = formData.resume

			if (resumeFile) {
				resumeUrl = await uploadResume()
			}

			const payload = {
				...formData,
				resume: resumeUrl,
				jobId: resolvedParams.id
			}

			const response = await fetch('/api/apply', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			})

			const data = await response.json()
			if (response.ok) {
				// Set submitted to true instead of clearing the form
				setSubmitted(true)
				setMessage('🎉 Application submitted successfully!')
			} else {
				setMessage(data.error || 'Something went wrong')
			}
		} catch (err) {
			setMessage('An error occurred. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='max-w-lg mx-auto p-4 bg-white rounded-lg my-6'>
			<h2 className='text-2xl font-bold mb-4 text-center'>
				Apply for Job
			</h2>

			{message && (
				<p
					className={`mb-6 text-center text-lg font-semibold ${
						message.includes('success')
							? 'text-green-600'
							: 'text-red-600'
					}`}
				>
					{message}
				</p>
			)}

			{submitted ? (
				<div className='text-center space-y-4 p-4'>
					<p className='text-lg'>
						Thank you for applying,{' '}
						<strong>{formData.firstName}</strong>!
					</p>
					<p className='mb-6'>
						Our HR team will review your application and get back to
						you within 3–5 business days.
					</p>
					<Link href={`/jobs`}>
						<Button className='mt-4'>Back to Jobs</Button>
					</Link>
				</div>
			) : (
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='flex gap-2'>
						<input
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
							placeholder='First Name'
							className='border p-2 w-1/2 rounded'
							required
						/>
						<input
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
							placeholder='Last Name'
							className='border p-2 w-1/2 rounded'
							required
						/>
					</div>

					<input
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
						placeholder='Email'
						className='border p-2 w-full rounded'
						required
					/>

					<input
						name='phone'
						value={formData.phone}
						onChange={handleChange}
						placeholder='Phone'
						className='border p-2 w-full rounded'
						required
					/>

					<input
						name='portfolio'
						value={formData.portfolio}
						onChange={handleChange}
						placeholder='Portfolio Link (Optional)'
						className='border p-2 w-full rounded'
					/>

					<div>
						<label className='block mb-1 font-medium'>
							Resume (Upload or Link)
						</label>
						<input
							type='file'
							accept='.pdf,.doc,.docx'
							onChange={handleResumeChange}
							className='border p-2 w-full rounded'
						/>
					</div>

					<textarea
						name='coverLetter'
						value={formData.coverLetter}
						onChange={handleChange}
						placeholder='Cover Letter (Optional)'
						className='border p-2 w-full rounded'
					/>

					<Button
						type='submit'
						disabled={isSubmitting}
						className={`w-full ${
							isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
						}`}
					>
						{isSubmitting ? 'Submitting...' : 'Submit Application'}
					</Button>
				</form>
			)}
		</div>
	)
}
