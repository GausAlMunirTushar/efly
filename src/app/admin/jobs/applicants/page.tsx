'use client'

import Title from '@/components/common/Title'
import React, { useEffect, useState } from 'react'

type Applicant = {
	_id: string
	firstName: string
	lastName: string
	email: string
	phone: string
	portfolio?: string
	resume: string
	coverLetter?: string
	jobId: string
	createdAt: string
}

const ApplicantsPage = () => {
	const [applicants, setApplicants] = useState<Applicant[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchApplicants = async () => {
			try {
				const res = await fetch('/api/apply')
				if (!res.ok) throw new Error('Failed to fetch applicants')
				const data = await res.json()
				setApplicants(data.applicants)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchApplicants()
	}, [])

	if (loading)
		return <p className='text-center mt-6'>Loading applicants...</p>
	if (error) return <p className='text-center mt-6 text-red-600'>{error}</p>
	if (applicants.length === 0)
		return <p className='text-center mt-6'>No applicants yet.</p>

	return (
		<div className='w-full bg-white rounded-lg mx-auto p-6'>
			<Title>Job Applicants</Title>
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse border border-gray-300'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2'>Name</th>
							<th className='border px-4 py-2'>Email</th>
							<th className='border px-4 py-2'>Phone</th>
							<th className='border px-4 py-2'>Portfolio</th>
							<th className='border px-4 py-2'>Resume</th>
							<th className='border px-4 py-2'>Job ID</th>
							<th className='border px-4 py-2'>Applied At</th>
						</tr>
					</thead>
					<tbody>
						{applicants.map(app => (
							<tr key={app._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>
									{app.firstName} {app.lastName}
								</td>
								<td className='border px-4 py-2'>
									{app.email}
								</td>
								<td className='border px-4 py-2'>
									{app.phone}
								</td>
								<td className='border px-4 py-2'>
									{app.portfolio ? (
										<a
											href={app.portfolio}
											target='_blank'
											className='text-blue-600 hover:underline'
										>
											Portfolio
										</a>
									) : (
										'-'
									)}
								</td>
								<td className='border px-4 py-2'>
									<td className='border px-4 py-2'>
										{app.resume ? (
											<a
												href={app.resume}
												download={`Resume-${app.firstName}-${app.lastName}`}
												className='text-blue-600 hover:underline'
											>
												Download Resume
											</a>
										) : (
											'-'
										)}
									</td>
								</td>
								<td className='border px-4 py-2'>
									{app.jobId}
								</td>
								<td className='border px-4 py-2'>
									{new Date(app.createdAt).toLocaleString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ApplicantsPage
