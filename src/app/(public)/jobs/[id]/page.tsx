'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation' // Use the `useParams` hook from the App Router
import { IJob } from '@/models/job.model'

const JobDetailPage = () => {
	const { id } = useParams() // Use the `id` from the URL params
	const [job, setJob] = useState<IJob | null>(null)

	useEffect(() => {
		const fetchJob = async () => {
			const response = await fetch(`/api/jobs/${id}`)
			const data = await response.json()
			setJob(data)
		}

		if (id) {
			fetchJob()
		}
	}, [id])

	if (!job) return <div>Loading...</div>

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-3xl font-semibold text-gray-900'>
				{job.title}
			</h1>
			<p className='text-xl font-semibold text-gray-600'>{job.company}</p>
			<p className='mt-2 text-gray-600'>{job.location}</p>
			<p className='mt-4 text-gray-700'>{job.description}</p>
			<p className='mt-4 font-semibold'>Requirements:</p>
			<ul className='list-disc pl-6'>
				{job.requirements.map((req, idx) => (
					<li key={idx} className='text-gray-600'>
						{req}
					</li>
				))}
			</ul>
			<div className='mt-6'>
				<span className='font-semibold'>Salary: </span>
				{job.salary}
			</div>
			<div className='mt-4'>
				<span className='font-semibold'>Deadline: </span>
				{new Date(job.deadline).toLocaleDateString()}
			</div>
			<div className='mt-6'>
				<span className='font-semibold'>Status: </span>
				<span
					className={`text-${job.status === 'open' ? 'green' : 'red'}-500`}
				>
					{job.status}
				</span>
			</div>
		</div>
	)
}

export default JobDetailPage
