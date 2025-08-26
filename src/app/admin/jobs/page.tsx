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

	// Delete job handler
	const handleDeleteJob = async (id: string) => {
		const confirmation = window.confirm(
			'Are you sure you want to delete this job?'
		)
		if (!confirmation) return

		try {
			const response = await fetch(`/api/jobs/${id}`, {
				method: 'DELETE'
			})

			if (response.ok) {
				// Remove job from the list after successful deletion
				setJobs(jobs.filter(job => job._id !== id))
			} else {
				console.error('Failed to delete job')
			}
		} catch (error) {
			console.error('Error deleting job:', error)
		}
	}

	return (
		<div className='w-full mx-auto p-4 bg-white min-h-full rounded-lg'>
			<div className='flex justify-between gap-2'>
				<Title>Jobs</Title>
				<Link href='/admin/jobs/create'>
					<Button size='sm' variant='primary'>
						Create New Job
					</Button>
				</Link>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
				{jobs.map(job => (
					<JobCard
						key={String(job._id)}
						job={job}
						onDelete={handleDeleteJob}
					/>
				))}
			</div>
		</div>
	)
}

export default JobListPage
