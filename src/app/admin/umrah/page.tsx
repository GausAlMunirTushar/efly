'use client'

import { useState, useCallback } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X } from 'lucide-react'

export default function AdminUmrahPage() {
	const [form, setForm] = useState({
		packagename: '',
		price: '',
		description: '',
		duration: '',
		images: [] as string[], // Store image URLs
		isFeatured: false
	})
	const [loading, setLoading] = useState(false)
	const [images, setImages] = useState<File[]>([]) // Store selected files for upload
	const [imagePreviews, setImagePreviews] = useState<string[]>([]) // Store image preview URLs
	const [imageUploading, setImageUploading] = useState<boolean>(false)
	const router = useRouter()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	// Image upload handling using Dropzone
	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages(prev => [...prev, ...acceptedFiles])

		// Create image preview URLs
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

	const handleImageUpload = async () => {
		if (images.length === 0) return

		setImageUploading(true)
		const formData = new FormData()
		images.forEach(image => formData.append('file', image)) // Append files to FormData

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			})

			const data = await res.json()
			console.log(data) // Log the response to check if the image URLs are returned properly

			if (data?.imageUrls) {
				setForm({ ...form, images: data.imageUrls }) // Set the image URLs in the form state
				toast.success('Images uploaded successfully!')
			} else {
				toast.error('Image upload failed: No URLs returned.')
			}
		} catch (error) {
			toast.error('Error uploading images.')
			console.error(error)
		} finally {
			setImageUploading(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Validation before submission
		if (!form.packagename || !form.price || form.images.length === 0) {
			toast.error('Please fill all fields and upload images.')
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
				router.push('/admin/umrah') // Redirect after successful package creation
			} else {
				toast.error('Failed to create Umrah package.')
			}
		} catch (error) {
			toast.error('Error while creating Umrah package.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-6 space-y-6'>
			<h1 className='text-2xl font-bold'>Create Umrah Package</h1>

			{/* Input fields for Umrah package details */}
			<Input
				name='packagename'
				placeholder='Package Name'
				value={form.packagename}
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
				name='duration'
				placeholder='Duration'
				value={form.duration}
				onChange={handleInputChange}
			/>
			<Input
				name='description'
				placeholder='Description'
				value={form.description}
				onChange={handleInputChange}
			/>

			{/* Image Upload Section */}
			<div className='mb-4'>
				<label className='block text-sm font-medium text-gray-700'>
					Upload Images
				</label>
				<div
					{...getRootProps()}
					className={`border-2 border-dashed p-6 rounded-lg text-center transition-all cursor-pointer ${isDragActive ? 'border-primary-500 bg-primary-100' : 'border-gray-300'}`}
				>
					<input {...getInputProps()} />
					<UploadCloud className='w-10 h-10 mx-auto text-gray-500' />
					<p className='text-gray-600'>
						{isDragActive
							? 'Drop the image here...'
							: 'Drag & drop images here or click to upload'}
					</p>
				</div>

				{/* Show previews of uploaded images */}
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

			{/* Button to trigger image upload */}
			<button
				type='button'
				onClick={handleImageUpload}
				className='w-full mt-4 py-2 bg-blue-600 text-white rounded-md'
				disabled={imageUploading} // Disable button while images are being uploaded
			>
				{imageUploading ? 'Uploading...' : 'Upload Images'}
			</button>

			{/* Submit Umrah package */}
			<Button
				onClick={handleSubmit}
				disabled={loading || form.images.length === 0}
			>
				{loading ? 'Creating Package...' : 'Create Package'}
			</Button>
		</div>
	)
}
