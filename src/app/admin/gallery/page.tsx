'use client'

import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Edit, Trash2, UploadCloud, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import Title from '@/components/common/Title'

type Gallery = {
	_id?: string
	title: string
	description: string
	galleryImage: string
}

export default function AdminGalleryPage() {
	const [form, setForm] = useState<Gallery>({
		title: '',
		description: '',
		galleryImage: ''
	})
	const [galleries, setGalleries] = useState<Gallery[]>([])
	const [imagePreviews, setImagePreviews] = useState<string[]>([])
	const [images, setImages] = useState<File[]>([])
	const [imageUploading, setImageUploading] = useState<boolean>(false)
	const [loading, setLoading] = useState(false)
	const [editingId, setEditingId] = useState<string | null>(null)
	const router = useRouter()

	// Fetch all gallery items
	const fetchGalleries = async () => {
		const res = await fetch('/api/gallery')
		const data = await res.json()
		setGalleries(data)
	}

	useEffect(() => {
		fetchGalleries()
	}, [])

	// Handle input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	// Dropzone handling for multiple image uploads
	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages(prev => [...prev, ...acceptedFiles])

		// Create image preview URLs
		const previews = acceptedFiles.map(file => URL.createObjectURL(file))
		setImagePreviews(prev => [...prev, ...previews])
	}, [])

	// Remove image from preview and upload list
	const removeImage = (index: number) => {
		setImages(prev => prev.filter((_, i) => i !== index))
		setImagePreviews(prev => prev.filter((_, i) => i !== index))
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		multiple: true
	})

	// Handle image upload
	const handleImageUpload = async () => {
		if (images.length === 0) return

		setImageUploading(true)
		const formData = new FormData()
		images.forEach(image => formData.append('file', image))

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			})
			const data = await res.json()
			console.log('Upload response:', data)

			if (data?.imageUrl) {
				setForm({ ...form, galleryImage: data.imageUrl }) // single URL string
				toast.success('Images uploaded successfully!')
			} else {
				toast.error('Image upload failed: No URL returned.')
			}
		} catch (error) {
			toast.error('Error uploading images.')
			console.error(error)
		} finally {
			setImageUploading(false)
		}
	}

	// Handle form submission for create or update
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Validate form
		if (!form.title || !form.description || form.galleryImage === '') {
			toast.error('Please fill all fields and upload images.')
			return
		}

		setLoading(true)

		try {
			const method = editingId ? 'PUT' : 'POST'
			const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery'
			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			})

			if (res.ok) {
				toast.success(
					editingId ? 'Gallery updated!' : 'Gallery created!'
				)
				setEditingId(null)
				setForm({ title: '', description: '', galleryImage: '' })
				fetchGalleries()
			} else {
				toast.error('Error creating gallery.')
			}
		} catch (error) {
			toast.error('Error while submitting gallery.')
		} finally {
			setLoading(false)
		}
	}

	// Handle gallery item delete
	const handleDelete = async (id: string) => {
		const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
		if (res.ok) {
			toast.success('Gallery deleted!')
			fetchGalleries()
		} else {
			toast.error('Failed to delete gallery.')
		}
	}

	// Handle gallery item edit
	const handleEdit = (gallery: Gallery) => {
		setForm(gallery)
		setEditingId(gallery._id || null)
	}

	return (
		<div className='p-4 space-y-6 bg-white rounded-lg'>
			<Title>{editingId ? 'Edit' : ''} Gallery</Title>

			{/* Input fields for gallery details */}
			<Input
				name='title'
				placeholder='Title'
				value={form.title}
				onChange={handleInputChange}
			/>
			<Input
				name='description'
				placeholder='Description'
				value={form.description}
				onChange={handleInputChange}
			/>

			{/* Image Upload */}
			<div className='mb-4'>
				<label className='block text-sm font-medium text-gray-700'>
					Upload Image
				</label>
				<div
					{...getRootProps()}
					className={`border-2 border-dashed p-6 rounded-lg text-center transition-all cursor-pointer ${isDragActive ? 'border-primary-500 bg-primary-100' : 'border-gray-300'}`}
				>
					<input {...getInputProps()} />
					<UploadCloud className='w-10 h-10 mx-auto text-gray-500' />
					<p className='text-gray-600'>
						{isDragActive
							? 'Drop the images here...'
							: 'Drag & drop images here or click to upload'}
					</p>
				</div>

				{/* Preview uploaded images */}
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

			{/* Upload Images Button */}
			<button
				type='button'
				onClick={handleImageUpload}
				className='w-full mt-4 py-2 bg-blue-800 text-white rounded-md'
				disabled={imageUploading}
			>
				{imageUploading ? 'Uploading...' : 'Upload Images'}
			</button>

			{/* Submit Button */}
			<Button
				onClick={handleSubmit}
				disabled={loading || form.galleryImage === ''}
			>
				{loading ? 'Creating Gallery...' : 'Create Gallery'}
			</Button>

			{/* Display Gallery */}
			<div className='pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{galleries.map(gallery => (
					<div
						key={gallery._id}
						className='bg-white rounded-lg shadow-md p-4 border border-gray-100'
					>
						<div className='h-52'>
							<Image
								src={gallery.galleryImage}
								alt='Gallery Image'
								width={500}
								height={500}
								className='w-full max-h-52 rounded-lg'
							/>
						</div>
						<h3 className='text-lg font-semibold my-2'>
							{gallery.title}
						</h3>

						<div className='flex gap-2 mt-4'>
							<Button
								size='sm'
								variant='primary'
								onClick={() => handleEdit(gallery)}
							>
								<Edit size={16} className='mr-2' /> Edit
							</Button>

							<Button
								size='sm'
								variant='danger'
								onClick={() => handleDelete(gallery._id!)}
							>
								<Trash2 size={16} className='mr-1' />
								Delete
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
