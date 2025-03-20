'use client'

import { useEffect, useState } from 'react'
import { IJob } from '@/models/job.model'
import JobCard from '@/components/pages/front-pages/jobs/JobCard'

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
			<div className='flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 h-36'>
				<h1 className='text-4xl font-bold text-white'>Jobs</h1>
			</div>
			<div className='container mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
					{jobs.map(job => (
						<JobCard key={String(job._id)} job={job} />
					))}
				</div>
			</div>
		</section>
	)
}

export default JobListPage
