'use client'

import dynamic from 'next/dynamic'
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

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

export default function AdminUmrahPage() {
	const [form, setForm] = useState<Omit<UmrahPackage, '_id'>>({
		packagename: '',
		price: '',
		description: '',
		duration: '',
		images: [],
		isFeatured: false
	})
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

	// Handle input change for the form
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target
		if (type === 'checkbox') {
			setForm({ ...form, [name]: checked })
		} else {
			setForm({ ...form, [name]: value })
		}
	}

	// Handle drag and drop for images
	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages(prev => [...prev, ...acceptedFiles])
		const previews = acceptedFiles.map(file => URL.createObjectURL(file))
		setImagePreviews(prev => [...prev, ...previews])
	}, [])

	// Remove an image from the selected list
	const removeImage = (index: number) => {
		setImages(prev => prev.filter((_, i) => i !== index))
		setImagePreviews(prev => prev.filter((_, i) => i !== index))
	}

	// Configure the dropzone for image upload
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		multiple: true
	})

	// Handle image uploads to the server
	const handleImageUpload = async () => {
		if (images.length === 0) {
			toast.error('No images selected for upload.')
			return
		}
		setImageUploading(true)

		try {
			const uploadedUrls: string[] = []

			for (const image of images) {
				const formData = new FormData()
				formData.append('file', image)

				const response = await apiClient.post('/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})

				const data = response.data
				if (!data?.imageUrl) {
					throw new Error(data?.error || 'Upload failed.')
				}

				uploadedUrls.push(data.imageUrl)
			}

			setForm(prev => ({ ...prev, images: uploadedUrls }))
			toast.success('Images uploaded successfully!')
		} catch (error: any) {
			console.error(error)
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					'Image upload failed.'
			)
		} finally {
			setImageUploading(false)
		}
	}

	// Handle form submission for creating a new Umrah package
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!form.packagename.trim() || !form.price.toString().trim()) {
			toast.error('Package name and price are required.')
			return
		}
		if (form.images.length === 0) {
			toast.error('Please upload at least one image.')
			return
		}

		setLoading(true)

		try {
			const payload: UmrahPackage = {
				...form,
				title: form.packagename, // Map packagename to title
				price: Number(form.price),
				description: form.description,
				duration: form.duration,
				hotelDetails: '', // Provide default or collect from form
				transportDetails: '' // Provide default or collect from form
			}

			await createUmrah(payload)
			toast.success('Umrah package created successfully!')
			router.push('/admin/umrah')
		} catch (error: any) {
			console.error('Create error:', error)
			toast.error(
				error?.response?.data?.message || 'Failed to create package.'
			)
		} finally {
			setLoading(false)
		}
	}

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
	const handleEdit = (pkg: UmrahPackage) => {
		// Pre-fill the form with the selected package details for editing
		setForm({
			...pkg,
			price: pkg.price.toString(), // Ensure price is string for input
			isFeatured: pkg.isFeatured || false
		})
	}

	return (
		<div className='bg-white p-6 space-y-4 rounded-lg'>
			<Title>{form._id ? 'Edit' : ''} Umrah</Title>

			<Input
				name='packagename'
				placeholder='Package Name'
				value={form.packagename}
				onChange={handleInputChange}
				required
			/>
			<Input
				name='price'
				placeholder='Price'
				type='number'
				value={form.price}
				onChange={handleInputChange}
				required
			/>
			<Input
				name='duration'
				placeholder='Duration'
				value={form.duration}
				onChange={handleInputChange}
			/>

			<JoditEditor
				name='description'
				value={form.description}
				onChange={newContent =>
					setForm(prevForm => ({
						...prevForm,
						description: newContent
					}))
				}
			/>

			<label className='inline-flex items-center space-x-2'>
				<input
					type='checkbox'
					name='isFeatured'
					checked={form.isFeatured}
					onChange={handleInputChange}
					className='form-checkbox'
				/>
				<span>Featured Package</span>
			</label>

			{/* Image Upload Section */}
			<div className='mb-4'>
				<label className='block text-sm font-medium text-gray-700 mb-2'>
					Upload Images
				</label>
				<div
					{...getRootProps()}
					className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition ${
						isDragActive
							? 'border-blue-500 bg-blue-100'
							: 'border-gray-300 bg-white'
					}`}
				>
					<input {...getInputProps()} />
					<UploadCloud className='w-10 h-10 mx-auto text-gray-500' />
					<p className='text-gray-600 mt-2'>
						{isDragActive
							? 'Drop the images here...'
							: 'Drag & drop images here or click to select'}
					</p>
				</div>

				{/* Previews */}
				<div className='mt-4 grid grid-cols-3 gap-4'>
					{imagePreviews.map((preview, idx) => (
						<div
							key={idx}
							className='relative group rounded overflow-hidden'
						>
							<Image
								src={preview}
								alt={`Preview ${idx + 1}`}
								width={100}
								height={100}
								className='object-cover rounded-lg'
								unoptimized
							/>
							<button
								type='button'
								onClick={() => removeImage(idx)}
								className='absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition'
								aria-label='Remove image'
							>
								<X className='w-4 h-4' />
							</button>
						</div>
					))}
				</div>
			</div>

			<button
				type='button'
				onClick={handleImageUpload}
				disabled={imageUploading || images.length === 0}
				className={`w-full py-2 rounded-md text-white ${
					imageUploading || images.length === 0
						? 'bg-gray-400 cursor-not-allowed'
						: 'bg-blue-600 hover:bg-blue-700'
				}`}
			>
				{imageUploading ? 'Uploading...' : 'Upload Images'}
			</button>

			<Button
				onClick={handleSubmit}
				disabled={loading || form.images.length === 0}
			>
				{loading
					? 'Saving...'
					: form._id
						? 'Update Package'
						: 'Create Package'}
			</Button>

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
								<button
									className='text-blue-500 hover:text-blue-700'
									title='Edit'
									onClick={() => handleEdit(pkg)}
								>
									<Edit size={20} />
								</button>
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
