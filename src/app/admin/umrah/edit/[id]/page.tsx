'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/form/Button'
import { ArrowLeft } from 'lucide-react'
import {
	UmrahPackage,
	getUmrahById,
	updateUmrah
} from '@/services/umrahService'
import Input from '@/components/form/Input'
import JoditEditor from 'jodit-react'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import Title from '@/components/common/Title'
import { UploadCloud, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import apiClient from '@/configs/apiConfig'
import Image from 'next/image' // Import Image component

type FormData = Omit<UmrahPackage, '_id'>

const UmrahPackageEditPage = () => {
	const { id } = useParams<{ id: string }>() // Typing useParams to include 'id'
	const router = useRouter()

	const [form, setForm] = useState<FormData>({
		packagename: '',
		price: '',
		description: '',
		duration: '',
		images: [],
		isFeatured: false
	})

	const [loading, setLoading] = useState(false)
	const [imagePreviews, setImagePreviews] = useState<string[]>([])
	const [images, setImages] = useState<File[]>([])
	const [imageUploading, setImageUploading] = useState(false)

	// Fetch the existing package data by id
	useEffect(() => {
		const fetchPackage = async () => {
			try {
				const packageData = await getUmrahById(id)
				setForm({
					packagename: packageData.packagename,
					price: packageData.price.toString(),
					description: packageData.description,
					duration: packageData.duration,
					images: packageData.images,
					isFeatured: packageData.isFeatured
				})
				setImagePreviews(packageData.images)
			} catch (error) {
				toast.error('Failed to fetch the Umrah package!')
			}
		}

		if (id) {
			fetchPackage()
		}
	}, [id])

	// Handle input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target
		if (type === 'checkbox') {
			setForm({ ...form, [name]: checked })
		} else {
			setForm({ ...form, [name]: value })
		}
	}

	// Handle image upload via drag and drop
	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages(prev => [...prev, ...acceptedFiles])
		const previews = acceptedFiles.map(file => URL.createObjectURL(file))
		setImagePreviews(prev => [...prev, ...previews])
	}, [])

	// Configure the dropzone for image upload
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		multiple: true
	})

	// Remove an image from the selected list
	const removeImage = (index: number) => {
		setImages(prev => prev.filter((_, i) => i !== index))
		setImagePreviews(prev => prev.filter((_, i) => i !== index))
	}

	// Handle form submission for updating the package
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!form.packagename.trim() || !form.price.trim()) {
			toast.error('Package name and price are required.')
			return
		}

		if (form.images.length === 0 && images.length === 0) {
			toast.error('Please upload at least one image.')
			return
		}

		setLoading(true)

		// Upload images to the server if new ones are added
		let uploadedImages: string[] = []
		if (images.length > 0) {
			setImageUploading(true)

			try {
				const formData = new FormData()
				images.forEach(image => formData.append('file', image))

				const response = await apiClient.post('/upload', formData, {
					headers: { 'Content-Type': 'multipart/form-data' }
				})

				// Log the response to check its structure
				console.log('Image Upload Response:', response.data)

				// Assuming the response contains an array of image URLs
				// If the response is a single image URL, adjust accordingly
				uploadedImages = Array.isArray(response.data.imageUrls)
					? response.data.imageUrls
					: [response.data.imageUrl] // Adjust this based on your API response

				setForm(prev => ({
					...prev,
					images: [...prev.images, ...uploadedImages]
				}))
				toast.success('Images uploaded successfully!')
			} catch (error) {
				toast.error('Failed to upload images.')
			} finally {
				setImageUploading(false)
			}
		}

		// Update Umrah package
		try {
			const updatedPackage = {
				...form,
				price: Number(form.price),
				title: form.packagename,
				images: [...uploadedImages]
			}
			await updateUmrah(id, updatedPackage)
			toast.success('Umrah package updated successfully!')
			router.push('/admin/umrah')
		} catch (error) {
			toast.error('Failed to update the Umrah package!')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='bg-white p-6 min-h-screen space-y-4 rounded-lg'>
			<div className='flex items-center justify-between'>
				<Title>Edit Umrah Package</Title>
				<Button size='sm' onClick={() => router.push('/admin/umrah')}>
					<ArrowLeft size={16} />
				</Button>
			</div>

			<div className='space-y-4'>
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

				<Button onClick={handleSubmit} disabled={loading}>
					{loading ? 'Saving...' : 'Update Package'}
				</Button>
			</div>
		</div>
	)
}

export default UmrahPackageEditPage
