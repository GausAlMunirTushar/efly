import React, { useState } from 'react'
import { IJob } from '@/models/job.model'
import Link from 'next/link'

interface JobCardProps {
	job: IJob

	onDelete: (id: string) => void // Prop for delete operation
}

const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => {
	const [isDeleting, setIsDeleting] = useState(false)

	// Function to handle Delete confirmation
	const handleDelete = () => {
		if (isDeleting) {
			onDelete(job._id as any)
		} else {
			setIsDeleting(true)
		}
	}

	return (
		<div className='max-w-sm bg-white border rounded-lg overflow-hidden transition duration-300'>
			<div className='p-6'>
				<h2 className='text-2xl font-semibold text-gray-800 mb-2'>
					{job.title}
				</h2>
				<p className='text-lg text-gray-600 font-medium'>
					{job.company}
				</p>
				<p className='text-sm text-gray-500 mb-4'>{job.location}</p>
				<p className='text-sm text-gray-500 mb-4'>
					{job.description.slice(0, 150)}...
				</p>

				<div className='mt-4 flex justify-between items-center'>
					<span className='text-green-500 font-semibold'>
						{job.status}
					</span>
					<Link
						href={`/jobs/${job._id}`}
						className='text-blue-500 hover:underline'
					>
						View Details
					</Link>
				</div>

				<div className='mt-4 flex justify-between'>
					<Link
						href={`/jobs/edit/${job._id}`}
						className='text-yellow-500 hover:text-yellow-600 font-semibold py-2 px-4 border border-yellow-500 rounded-lg transition duration-300 hover:bg-yellow-100'
					>
						Edit
					</Link>

					<button
						onClick={handleDelete}
						className='text-red-500 hover:text-red-600 font-semibold py-2 px-4 border border-red-500 rounded-lg transition duration-300 hover:bg-red-100'
					>
						{isDeleting ? 'Are you sure?' : 'Delete'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default JobCard
