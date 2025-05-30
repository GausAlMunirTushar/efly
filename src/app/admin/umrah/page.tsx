'use client'

import { useState, useCallback } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X } from 'lucide-react'
import JoditEditor from 'jodit-react'

export default function AdminUmrahPage() {
	const [form, setForm] = useState({
		packagename: '',
		price: '',
		description: '',
		duration: '',
		images: [] as string[], // image URLs from server
		isFeatured: false
	})
	const [loading, setLoading] = useState(false)
	const [images, setImages] = useState<File[]>([]) // local files for upload
	const [imagePreviews, setImagePreviews] = useState<string[]>([]) // preview URLs
	const [imageUploading, setImageUploading] = useState(false)
	const router = useRouter()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target
		if (type === 'checkbox') {
			setForm({ ...form, [name]: checked })
		} else {
			setForm({ ...form, [name]: value })
		}
	}

	// Dropzone handlers
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
		multiple: true
	})

	// Upload multiple images sequentially (or parallel)
	const handleImageUpload = async () => {
		if (images.length === 0) {
			toast.error('No images selected for upload.')
			return
		}
		setImageUploading(true)

		try {
			// Parallel upload for speed:
			const uploadPromises = images.map(async image => {
				const formData = new FormData()
				formData.append('file', image)
				const res = await fetch('/api/upload', {
					method: 'POST',
					body: formData
				})
				const data = await res.json()
				if (!res.ok || !data.imageUrl)
					throw new Error(data.error || 'Image upload failed')
				return data.imageUrl
			})

			const uploadedUrls = await Promise.all(uploadPromises)
			setForm(prev => ({ ...prev, images: uploadedUrls }))
			toast.success('Images uploaded successfully!')
		} catch (error: any) {
			toast.error(`Image upload failed: ${error.message || error}`)
			console.error(error)
		} finally {
			setImageUploading(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!form.packagename || !form.price || form.images.length === 0) {
			toast.error('Please fill all required fields and upload images.')
			return
		}

		setLoading(true)
		try {
			const res = await fetch('/api/umrah', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			})

			if (res.ok) {
				toast.success('Umrah package created successfully!')
				router.push('/admin/umrah')
			} else {
				toast.error('Failed to create Umrah package.')
			}
		} catch (error) {
			toast.error('Error while creating Umrah package.')
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='w-full bg-white p-6 space-y-6 mx-auto rounded-lg'>
			<h1 className='text-2xl font-bold'>Umrah Package</h1>

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
				{loading ? 'Creating Package...' : 'Create Package'}
			</Button>
		</div>
	)
}
