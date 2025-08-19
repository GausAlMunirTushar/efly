'use client'

import { useEffect, useState } from 'react'
import { IJob } from '@/models/job.model'
import JobCard from '@/components/pages/front-pages/jobs/JobCard'
import Title from '@/components/common/Title'
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
		<div className='container mx-auto p-4 bg-white min-h-full rounded-lg'>
			<div className='flex justify-between gap-2'>
				<Title>Jobs</Title>
				<Link href='/jobs/create'>
					<Button size='sm' variant='primary'>
						Create New Job
					</Button>
				</Link>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
				{jobs.map(job => (
					<JobCard key={String(job._id)} job={job} />
				))}
			</div>
		</div>
	)
}

export default JobListPage
