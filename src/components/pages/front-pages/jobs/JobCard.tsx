import React from 'react'
import { IJob } from '@/models/job.model'
import Link from 'next/link'

interface JobCardProps {
	job: IJob
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
	return (
		<div className='max-w-sm bg-white shadow-lg rounded-lg overflow-hidden'>
			<div className='p-6'>
				<h2 className='text-xl font-semibold text-gray-800'>
					{job.title}
				</h2>
				<p className='text-gray-600'>{job.company}</p>
				<p className='text-gray-500'>{job.location}</p>
				<p className='text-sm text-gray-500 mt-2'>
					{job.description.slice(0, 150)}...
				</p>
				<div className='mt-4 flex justify-between items-center'>
					<span className='text-green-500 font-semibold'>
						{job.status}
					</span>
					<Link
						href={`/job/${job._id}`}
						className='text-blue-500 hover:underline'
					>
						View Details
					</Link>
				</div>
			</div>
		</div>
	)
}

export default JobCard
