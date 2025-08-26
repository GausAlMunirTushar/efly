'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Title from '@/components/common/Title'
import Link from 'next/link'
import Button from '@/components/form/Button'
import { ArrowLeft } from 'lucide-react'
import Input from '@/components/form/Input'
import JoditEdit from '@/components/form/JoditEditor'

const CreateJobPage = () => {
	const [formData, setFormData] = useState({
		title: '',
		company: '',
		location: '',
		description: '',
		requirements: '',
		salary: '',
		deadline: '',
		status: 'open'
	})

	const router = useRouter()

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleRichTextChange = (
		name: 'description' | 'requirements',
		value: string
	) => {
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const response = await fetch('/api/jobs', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			router.push('/admin/jobs')
		} else {
			alert('Failed to create job')
		}
	}

	return (
		<div className='w-full mx-auto p-4 bg-white min-h-full rounded-lg'>
			<div className='flex justify-between gap-2'>
				<Title>Jobs</Title>
				<Link href='/admin/jobs'>
					<Button size='sm' variant='primary'>
						<ArrowLeft size={16} />
					</Button>
				</Link>
			</div>

			<form onSubmit={handleSubmit} className='mt-6 space-y-3'>
				<div>
					<label htmlFor='title' className='block text-gray-700'>
						Job Title
					</label>
					<Input
						type='text'
						id='title'
						name='title'
						placeholder='Enter job title...'
						value={formData.title}
						onChange={handleChange}
						className='w-full mt-2 p-2 border border-gray-300 rounded-md'
						required
					/>
				</div>

				<div>
					<label htmlFor='company' className='block text-gray-700'>
						Company
					</label>
					<Input
						type='text'
						placeholder='Enter company name...'
						id='company'
						name='company'
						value={formData.company}
						onChange={handleChange}
						className='w-full mt-2 p-2 border border-gray-300 rounded-md'
						required
					/>
				</div>

				<div>
					<label htmlFor='location' className='block text-gray-700'>
						Location
					</label>
					<Input
						type='text'
						id='location'
						placeholder='Enter location...'
						name='location'
						value={formData.location}
						onChange={handleChange}
						className='w-full mt-2 p-2 border border-gray-300 rounded-md'
						required
					/>
				</div>

				{/* Description with JoditEdit */}
				<div>
					<label
						htmlFor='description'
						className='block text-gray-700 mb-2'
					>
						Job Description
					</label>
					<JoditEdit
						value={formData.description}
						onChange={value =>
							handleRichTextChange('description', value)
						}
						placeholder='Enter job description...'
					/>
				</div>

				{/* Requirements with JoditEdit */}
				<div>
					<label
						htmlFor='requirements'
						className='block text-gray-700 mb-2'
					>
						Requirements
					</label>
					<JoditEdit
						value={formData.requirements}
						onChange={value =>
							handleRichTextChange('requirements', value)
						}
						placeholder='Enter job requirements...'
					/>
				</div>

				<div>
					<label htmlFor='salary' className='block text-gray-700'>
						Salary
					</label>
					<Input
						type='number'
						id='salary'
						name='salary'
						placeholder='Enter salary...'
						value={formData.salary}
						onChange={handleChange}
						className='w-full mt-2 p-2 border border-gray-300 rounded-md'
						required
					/>
				</div>

				<div>
					<label htmlFor='deadline' className='block text-gray-700'>
						Deadline
					</label>
					<Input
						type='date'
						id='deadline'
						name='deadline'
						value={formData.deadline}
						onChange={handleChange}
						className='w-full mt-2 p-2 border border-gray-300 rounded-md'
						required
					/>
				</div>

				<div className='mt-4 flex justify-end'>
					<Button type='submit'>Create Job</Button>
				</div>
			</form>
		</div>
	)
}

export default CreateJobPage
