'use client'

import { useState, useEffect, useCallback } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X, Edit, Trash } from 'lucide-react'
import {
	createUmrah,
	getAllUmrah,
	deleteUmrah,
	updateUmrah,
	UmrahPackage
} from '@/services/umrahService'
import apiClient from '@/configs/apiConfig'
import Title from '@/components/common/Title'
import Link from 'next/link'

export default function AdminUmrahPage() {
	const [umrahPackages, setUmrahPackages] = useState<UmrahPackage[]>([])
	const [loading, setLoading] = useState(false)
	const [images, setImages] = useState<File[]>([])
	const [imagePreviews, setImagePreviews] = useState<string[]>([])
	const [imageUploading, setImageUploading] = useState(false)
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

	// Handle the edit action
	// const handleEdit = (pkg: UmrahPackage) => {
	// 	// Pre-fill the form with the selected package details for editing
	// 	setForm({
	// 		...pkg,
	// 		price: pkg.price.toString(), // Ensure price is string for input
	// 		isFeatured: pkg.isFeatured || false
	// 	})
	// }

	return (
		<div className='bg-white p-6 space-y-4 rounded-lg'>
			<div className='flex items-center justify-between'>
				<Title>Umrah</Title>
				<Link href='/admin/umrah/create'>
					<Button size='sm'>Create Umrah Package</Button>
				</Link>
			</div>

			{/* Umrah Packages Table */}
			<h2 className='text-xl font-semibold mt-8'>
				Existing Umrah Packages
			</h2>
			<table className='min-w-full table-auto mt-4'>
				<thead>
					<tr className='bg-gray-100'>
						<th className='px-4 py-2 border text-left'>Title</th>
						<th className='px-4 py-2 border text-left'>Price</th>
						<th className='px-4 py-2 border text-left'>Duration</th>
						<th className='px-4 py-2 border text-left'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{umrahPackages.map(pkg => (
						<tr key={pkg._id} className='border-b hover:bg-gray-50'>
							<td className='px-4 py-2'>{pkg.title}</td>
							<td className='px-4 py-2'>{pkg.price} BDT</td>
							<td className='px-4 py-2'>{pkg.duration}</td>
							<td className='px-4 py-2 flex items-center space-x-4'>
								{/* <button
									className='text-blue-500 hover:text-blue-700'
									title='Edit'
									onClick={() => handleEdit(pkg)}
								>
									<Edit size={20} />
								</button> */}
								<button
									className='text-red-500 hover:text-red-700'
									title='Delete'
									onClick={() =>
										handleDelete(pkg._id as string)
									}
								>
									<Trash size={20} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
