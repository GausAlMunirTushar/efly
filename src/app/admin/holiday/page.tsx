'use client'

import { useState, useEffect, useCallback } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X } from 'lucide-react'
import { IHoliday } from '@/models/holiday.model'

const AdminHolidayPage = () => {
	const [form, setForm] = useState({
		title: '',
		price: '',
		location: '',
		nightsInfo: '',
		description: '',
		tags: '',
		imageUrl: ''
	})
	const [packages, setPackages] = useState<IHoliday[]>([])
	const [images, setImages] = useState<File[]>([])
	const [imagePreviews, setImagePreviews] = useState<string[]>([])
	const [imageUploading, setImageUploading] = useState(false)
	const [loading, setLoading] = useState(false)
	const [editingId, setEditingId] = useState<string | null>(null)
	const router = useRouter()

	const fetchPackages = async () => {
		const res = await fetch('/api/holiday')
		const data = await res.json()
		setPackages(data)
	}

	useEffect(() => {
		fetchPackages()
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages(prev => [...prev, ...acceptedFiles])
		const previews = acceptedFiles.map(file => URL.createObjectURL(file))
		setImagePreviews(prev => [...prev, ...previews])
	}, [])

	const removeImage = (index: number) => {
		setImages(prev => prev.filter((_, i) => i !== index))
		setImagePreviews(prev => prev.filter((_, i) => i !== index))
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		multiple: false
	})

	const uploadImages = async () => {
		if (!images.length) return ''
		setImageUploading(true)
		const formData = new FormData()
		images.forEach(file => formData.append('file', file))

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			})
			const data = await res.json()
			if (data?.imageUrl) {
				setForm(prev => ({ ...prev, countryImage: data.imageUrl }))
				toast.success('Image uploaded successfully!')
			} else {
				toast.error('Image upload failed.')
			}
		} catch (error) {
			toast.error('Image upload error')
			return ''
		} finally {
			setImageUploading(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const uploadedImage = await uploadImages()
			if (!uploadedImage && !form.imageUrl)
				throw new Error('Image is required')

			const res = await fetch(
				editingId ? `/api/holiday/${editingId}` : '/api/holiday',
				{
					method: editingId ? 'PUT' : 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						...form,
						imageUrl: uploadedImage || form.imageUrl,
						price: parseFloat(form.price),
						tags: form.tags.split(',')
					})
				}
			)

			if (!res.ok) throw new Error('Failed to save package')

			toast.success(
				`Holiday package ${editingId ? 'updated' : 'created'} successfully`
			)
			setForm({
				title: '',
				price: '',
				location: '',
				nightsInfo: '',
				description: '',
				tags: '',
				imageUrl: ''
			})
			setImages([])
			setImagePreviews([])
			setEditingId(null)
			fetchPackages()
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setLoading(false)
		}
	}

	const handleEdit = (pkg: IHoliday) => {
		setEditingId(pkg.id)
		setForm({
			title: pkg.title,
			price: pkg.price.toString(),
			location: pkg.location,
			nightsInfo: pkg.nightsInfo,
			description: pkg.description || '',
			tags: pkg.tags.join(','),
			imageUrl: pkg.imageUrl
		})
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this package?')) return
		try {
			const res = await fetch(`/api/holiday/${id}`, { method: 'DELETE' })
			if (!res.ok) throw new Error('Failed to delete')
			toast.success('Deleted successfully')
			fetchPackages()
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	return (
		<div className='p-6 space-y-6'>
			<h1 className='text-2xl font-bold'>Manage Holiday Packages</h1>

			<form
				onSubmit={handleSubmit}
				className='grid grid-cols-1 md:grid-cols-2 gap-4'
			>
				<Input
					name='title'
					placeholder='Title'
					value={form.title}
					onChange={handleInputChange}
				/>
				<Input
					name='price'
					placeholder='Price'
					type='number'
					value={form.price}
					onChange={handleInputChange}
				/>
				<Input
					name='location'
					placeholder='Location'
					value={form.location}
					onChange={handleInputChange}
				/>
				<Input
					name='nightsInfo'
					placeholder='Nights Info'
					value={form.nightsInfo}
					onChange={handleInputChange}
				/>
				<Input
					name='description'
					placeholder='Description'
					value={form.description}
					onChange={handleInputChange}
				/>
				<Input
					name='tags'
					placeholder='Tags (comma-separated)'
					value={form.tags}
					onChange={handleInputChange}
				/>

				<div className='mb-4 col-span-full'>
					<label className='block text-sm font-medium text-gray-700'>
						Upload Image
					</label>
					<div
						{...getRootProps()}
						className={`border-2 border-dashed p-6 rounded-lg text-center transition-all cursor-pointer ${
							isDragActive
								? 'border-primary-500 bg-primary-100'
								: 'border-gray-300'
						}`}
					>
						<input {...getInputProps()} />
						<UploadCloud className='w-10 h-10 mx-auto text-gray-500' />
						<p className='text-gray-600'>
							{isDragActive
								? 'Drop the image here...'
								: 'Drag & drop image or click to upload'}
						</p>
					</div>

					<div className='mt-4 grid grid-cols-3 gap-4'>
						{imagePreviews.map((preview, index) => (
							<div key={index} className='relative group'>
								<Image
									src={preview}
									alt={`Image Preview ${index}`}
									width={100}
									height={100}
									className='object-cover rounded-lg'
								/>
								<button
									type='button'
									className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition'
									onClick={() => removeImage(index)}
									aria-label='Remove image'
								>
									<X className='w-4 h-4' />
								</button>
							</div>
						))}
					</div>
				</div>

				<Button type='submit' disabled={loading || imageUploading}>
					{loading || imageUploading
						? 'Saving...'
						: editingId
							? 'Update Package'
							: 'Create Package'}
				</Button>
			</form>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{packages.map(pkg => (
					<div
						key={pkg.id}
						className='border rounded-lg p-4 bg-white shadow-md flex flex-col justify-between'
					>
						<div>
							<h2 className='text-lg font-semibold'>
								{pkg.title}
							</h2>
							<p className='text-sm text-muted-foreground'>
								{pkg.location}
							</p>
							<p className='text-sm mt-2'>
								Price: BDT {pkg.price.toLocaleString()}
							</p>
							<img
								src={pkg.imageUrl}
								alt={pkg.title}
								className='mt-2 w-full h-40 object-cover rounded'
							/>
						</div>
						<div className='flex justify-end gap-2 mt-4'>
							<button
								onClick={() => handleEdit(pkg)}
								className='px-3 py-1 text-sm bg-yellow-500 text-white rounded'
							>
								Edit
							</button>
							<button
								onClick={() => handleDelete(pkg.id)}
								className='px-3 py-1 text-sm bg-red-600 text-white rounded'
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AdminHolidayPage
