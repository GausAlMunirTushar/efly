'use client'

import { useEffect, useState } from 'react'
import { IJob } from '@/models/job.model'
import Button from '@/components/form/Button'
import Link from 'next/link'

const JobListPage = () => {
	const [jobs, setJobs] = useState<IJob[]>([])

	useEffect(() => {
		const fetchJobs = async () => {
			const response = await fetch('/api/jobs')
			const data = await response.json()
			setJobs(data)
		}

		fetchJobs()
	}, [])

	return (
		<section>
			{/* Header */}
			<div className='flex items-center justify-center bg-[#0058A8] h-36'>
				<h1 className='text-4xl font-bold text-white'>Jobs</h1>
			</div>

			{/* Job List */}
			<div className='max-w-7xl mx-auto py-6 px-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
					{jobs.map(job => (
						<div
							key={String(job._id)}
							className='bg-white border rounded-lg p-6 flex flex-col justify-between transition-shadow duration-300'
						>
							<div>
								<h2 className='text-xl font-semibold text-gray-800'>
									{job.title}
								</h2>
								<p className='text-gray-600 mt-1'>
									{job.company}
								</p>
								<p className='text-gray-500 mt-1 text-sm'>
									{job.location}
								</p>

								<div className='mt-3 text-gray-700 text-sm line-clamp-4'>
									{/* Render description as HTML safely */}
									<div
										dangerouslySetInnerHTML={{
											__html: job.description
										}}
									/>
								</div>
							</div>

							<div className='mt-4 flex items-center justify-between'>
								<p className='text-green-600 font-medium'>
									Salary:{' '}
									{job.salary
										? `${job.salary} BDT`
										: 'Not specified'}
								</p>
								<p className='text-sm text-gray-400'>
									Deadline:{' '}
									{job.deadline
										? new Date(
												job.deadline
											).toLocaleDateString()
										: 'N/A'}
								</p>
							</div>

							<Link href={`/jobs/${job._id}`}>
								<Button className='mt-4 '>View Details</Button>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default JobListPage
