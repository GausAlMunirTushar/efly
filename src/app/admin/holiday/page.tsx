'use client'

import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Trash, Edit } from 'lucide-react'
import { getAllHolidays, deleteHoliday } from '@/services/holidayService'
import Title from '@/components/common/Title'
import Link from 'next/link'
import Button from '@/components/form/Button'

interface HolidayPackage {
	_id: string
	title: string
	description: string
	imageUrl: string
	price: number
	location: { name: string }
}

const AdminHolidayPage = () => {
	const [packages, setPackages] = useState<HolidayPackage[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const router = useRouter()

	// Fetch all holiday packages
	useEffect(() => {
		const loadPackages = async () => {
			try {
				const data = await getAllHolidays()
				setPackages(data)
			} catch (error) {
				toast.error('Failed to load holiday packages')
			}
		}
		loadPackages()
	}, [])

	// Handle the delete action for holiday packages
	const handleDelete = async (_id: string) => {
		if (confirm('Are you sure you want to delete this package?')) {
			try {
				await deleteHoliday(_id)
				setPackages(packages.filter(pkg => pkg._id !== _id))
				toast.success('Package deleted successfully')
			} catch {
				toast.error('Failed to delete package')
			}
		}
	}

	return (
		<div className='bg-white p-6 min-h-screen rounded-lg'>
			<div className='flex items-center justify-between'>
				<Title>Holiday</Title>
				<Link href='/admin/holiday/create'>
					<Button size='sm'>Create Holiday Package</Button>
				</Link>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
				{packages.map(pkg => (
					<div key={pkg._id} className='bg-white rounded-lg shadow'>
						<div className='relative'>
							<img
								src={pkg.imageUrl}
								alt={pkg.title}
								className='w-full h-48 object-cover rounded-t-md'
							/>
						</div>
						<div className='p-4'>
							<h3 className='text-lg font-semibold truncate'>
								{pkg.title}
							</h3>

							<div className='mt-4 flex justify-between'>
								<button
									className='flex bg-primary px-4 py-2 text-white gap-2 items-center rounded'
									title='Edit'
									onClick={() =>
										router.push(
											`/admin/holiday/edit/${pkg._id}`
										)
									}
								>
									<Edit size={20} /> <span>Edit</span>
								</button>
								<button
									className='flex bg-red-500 px-4 py-2 text-white gap-2 items-center rounded'
									title='Delete'
									onClick={() => handleDelete(pkg._id)}
								>
									<Trash size={20} /> <p>Delete</p>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AdminHolidayPage
