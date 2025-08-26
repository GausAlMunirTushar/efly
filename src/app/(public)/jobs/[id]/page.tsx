'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { IJob } from '@/models/job.model'
import Link from 'next/link'

const JobDetailPage = () => {
	const { id } = useParams()
	const [job, setJob] = useState<IJob | null>(null)

	useEffect(() => {
		const fetchJob = async () => {
			const response = await fetch(`/api/jobs/${id}`)
			const data = await response.json()
			setJob(data)
		}

		if (id) fetchJob()
	}, [id])

	if (!job) return <div className='text-center py-10'>Loading...</div>

	const jobId = typeof id === 'string' ? id : ''

	return (
		<div className='max-w-6xl mx-auto p-4 bg-white rounded-lg'>
			{/* Job Header */}
			<div className='mb-6'>
				<h1 className='text-3xl font-bold text-gray-900'>
					{job.title}
				</h1>
				<p className='text-xl text-gray-700 mt-1'>{job.company}</p>
				<p className='text-gray-500 mt-1'>{job.location}</p>
			</div>

			{/* Description */}
			<div className='mb-6'>
				<h2 className='text-xl font-semibold mb-2 text-gray-800'>
					Job Description
				</h2>
				<div
					className='text-gray-700 prose max-w-full'
					dangerouslySetInnerHTML={{ __html: job.description }}
				/>
			</div>

			{/* Requirements */}
			<div className='mb-6'>
				<h2 className='text-xl font-semibold mb-2 text-gray-800'>
					Requirements
				</h2>

				{job.requirements.map((req, idx) => (
					<div key={idx} dangerouslySetInnerHTML={{ __html: req }} />
				))}
			</div>

			{/* Salary & Deadline */}
			<div className=''>
				<div className='text-gray-700'>
					<span className='font-semibold'>Salary: </span>
					{job.salary || 'Not specified'}
				</div>
				<div className='text-gray-700'>
					<span className='font-semibold'>Deadline: </span>
					{job.deadline
						? new Date(job.deadline).toLocaleDateString()
						: 'N/A'}
				</div>
			</div>

			{/* Status */}
			<div className='mb-6'>
				<span className='font-semibold'>Status: </span>
				<span
					className={`font-medium ${
						job.status === 'open'
							? 'text-green-600'
							: 'text-red-600'
					}`}
				>
					{job.status.toUpperCase()}
				</span>
			</div>

			{/* Apply Button */}
			<div className='text-center'>
				<Link
					href={`/jobs/${job._id}/apply`}
					className='inline-block bg-primary text-white font-semibold py-2 px-6 rounded transition-colors duration-200'
				>
					Apply Now
				</Link>
			</div>
		</div>
	)
}

export default JobDetailPage
