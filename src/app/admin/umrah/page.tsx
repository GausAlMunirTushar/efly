'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Trash, Edit } from 'lucide-react'
import { getAllUmrah, deleteUmrah } from '@/services/umrahService'
import Title from '@/components/common/Title'
import Link from 'next/link'
import Button from '@/components/form/Button'

export default function AdminUmrahPage() {
	const [umrahPackages, setUmrahPackages] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	// Fetch all Umrah packages
	useEffect(() => {
		const fetchUmrahPackages = async () => {
			try {
				const data = await getAllUmrah()
				setUmrahPackages(data)
			} catch (error) {
				toast.error('Failed to fetch Umrah packages!')
			}
		}

		fetchUmrahPackages()
	}, [])

	// Handle the delete action for Umrah packages
	const handleDelete = async (id: string) => {
		try {
			await deleteUmrah(id)
			setUmrahPackages(umrahPackages.filter(pkg => pkg._id !== id))
			toast.success('Umrah package deleted successfully!')
		} catch (error) {
			toast.error('Failed to delete Umrah package!')
		}
	}

	return (
		<div className='bg-white p-6 space-y-4 min-h-screen rounded-lg'>
			<div className='flex items-center justify-between'>
				<Title>Umrah</Title>
				<Link href='/admin/umrah/create'>
					<Button size='sm'>Create Umrah Package</Button>
				</Link>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
				{umrahPackages.map(pkg => (
					<div key={pkg._id} className='bg-white rounded-lg shadow'>
						<div className='relative'>
							<img
								src={pkg.images[0]}
								alt={pkg.packagename}
								className='w-full h-48 object-cover rounded-t-md'
							/>
							<div className='absolute top-2 right-2'></div>
						</div>
						<div className='p-4'>
							<div className='mt-2 h-10'>
								<h3 className='text-lg font-semibold line-clamp-1'>
									{pkg.packagename}
								</h3>
							</div>
							<div className='mt-4 flex justify-between'>
								<button
									className=' flex bg-primary px-4 py-2 text-white gap-2 items-center rounded'
									title='Edit'
									onClick={() =>
										router.push(
											`/admin/umrah/edit/${pkg._id}`
										)
									}
								>
									<Edit size={20} /> <span>Edit</span>
								</button>
								<button
									className=' flex bg-red-500 px-4 py-2 text-white gap-2 items-center rounded'
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
