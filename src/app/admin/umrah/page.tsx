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
	id: string
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
	const handleDelete = async (id: string) => {
		if (confirm('Are you sure you want to delete this package?')) {
			try {
				await deleteHoliday(id)
				setPackages(packages.filter(pkg => pkg.id !== id))
				toast.success('Package deleted successfully')
			} catch {
				toast.error('Failed to delete package')
			}
		}
	}

	return (
		<div className='bg-white p-6 min-h-screen rounded-lg'>
			<div className='flex items-center justify-between'>
				<Title>Holiday Packages</Title>
				<Link href='/admin/holidays/create'>
					<Button size='sm'>Create Holiday Package</Button>
				</Link>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
				{packages.map(pkg => (
					<div key={pkg.id} className='bg-white rounded-lg shadow-lg'>
						<div className='relative'>
							<img
								src={pkg.imageUrl}
								alt={pkg.title}
								className='w-full h-48 object-cover rounded-t-md'
							/>
							<div className='absolute top-2 right-2'>
								<button
									className='bg-primary text-white p-2 rounded-full'
									title='Edit'
									onClick={() =>
										router.push(
											`/admin/holidays/edit/${pkg.id}`
										)
									}
								>
									<Edit size={20} />
								</button>
							</div>
						</div>
						<div className='p-4'>
							<h3 className='text-lg font-semibold truncate'>
								{pkg.title}
							</h3>
							<p className='text-sm text-gray-600 mt-2'>
								{pkg.description}
							</p>
							<div className='mt-4 flex justify-between items-center'>
								<span className='text-xl font-bold'>
									{pkg.price} BDT
								</span>
								<button
									className='bg-red-500 text-white p-2 rounded-full'
									title='Delete'
									onClick={() => handleDelete(pkg.id)}
								>
									<Trash size={20} />
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
