'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Button from '@/components/form/Button'
import { ArrowLeft, UploadCloud, X } from 'lucide-react'
import Select from 'react-select'
import Input from '@/components/form/Input'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { createHoliday } from '@/services/holidayService'
import { getAllLocations } from '@/services/locationService'
import { SingleValue } from 'react-select'
import apiClient from '@/configs/apiConfig'
import Title from '@/components/common/Title'
import Link from 'next/link'
import Image from 'next/image'

import dynamic from 'next/dynamic'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

type FormState = {
	title: string
	price: string
	location: LocationOption | null
	nightsInfo: string
	description: string
	tags: string[]
	imageUrl: string
}

type LocationOption = { label: string; value: string }

const HolidayPackageCreatePage = () => {
	const router = useRouter()

	const [form, setForm] = useState<FormState>({
		title: '',
		price: '',
		location: null,
		nightsInfo: '',
		description: '',
		tags: [],
		imageUrl: ''
	})

	const [locations, setLocations] = useState<LocationOption[]>([])
	const [newLocation, setNewLocation] = useState<string>('')
	const [images, setImages] = useState<File[]>([])
	const [imagePreviews, setImagePreviews] = useState<string[]>([])
	const [imageUploading, setImageUploading] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const data = await getAllLocations()
				setLocations(
					data.map((loc: any) => ({
						label: loc.name,
						value: loc._id
					}))
				)
			} catch {
				toast.error('Failed to load locations')
			}
		}
		fetchLocations()
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleLocationChange = (selected: SingleValue<LocationOption>) => {
		setForm(prev => ({ ...prev, location: selected }))
	}

	const handleTagChange = (selectedTags: any) => {
		const selectedValues = selectedTags
			? selectedTags.map((item: any) => item.value)
			: []
		setForm(prev => ({ ...prev, tags: selectedValues }))
	}

	const onDrop = useCallback((acceptedFiles: FileList) => {
		const filesArray = Array.from(acceptedFiles)
		setImages(filesArray)
		setImagePreviews(filesArray.map(file => URL.createObjectURL(file)))
	}, [])

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

			setForm(prev => ({ ...prev, imageUrl: uploadedUrls[0] }))
			toast.success('Image uploaded successfully!')
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!form.title.trim() || !form.price.trim()) {
			toast.error('Title and price are required.')
			return
		}

		if (!form.imageUrl) {
			toast.error('Please upload an image first.')
			return
		}

		const payload = {
			...form,
			price: parseFloat(form.price)
			// location: form.location?.value
		}

		setLoading(true)
		try {
			await createHoliday(payload)
			toast.success('Holiday package created successfully!')
			router.push('/admin/holiday')
		} catch (error) {
			toast.error('Failed to create holiday package.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-6 bg-white rounded-lg min-h-screen'>
			<div className='flex items-center justify-between mb-4'>
				<Title>Create Holiday Package</Title>
				<Link href='/admin/holiday'>
					<Button size='sm'>
						<ArrowLeft size={16} />
					</Button>
				</Link>
			</div>

			<form className='space-y-3' onSubmit={handleSubmit}>
				<Input
					name='title'
					placeholder='Title'
					value={form.title}
					onChange={handleInputChange}
					required
				/>
				<Input
					name='price'
					type='number'
					placeholder='Price'
					value={form.price}
					onChange={handleInputChange}
					required
				/>
				<Input
					name='nightsInfo'
					placeholder='Nights Info'
					value={form.nightsInfo}
					onChange={handleInputChange}
				/>
				{/* Location Select */}
				<div>
					<label>Select Location</label>
					<Select
						options={locations}
						value={form.location}
						onChange={handleLocationChange}
						isClearable
					/>
				</div>

				{/* Tags Select */}
				<div>
					<label>Tags</label>
					<Select
						isMulti
						options={[
							{ label: 'Hotel', value: 'Hotel' },
							{ label: 'Transfer', value: 'Transfer' }
						]}
						value={form.tags.map(tag => ({
							label: tag,
							value: tag
						}))}
						onChange={handleTagChange}
					/>
				</div>

				{/* Jodit Editor for Description */}
				<div>
					<label>Description</label>
					<JoditEditor
						value={form.description}
						onChange={newContent =>
							setForm(prev => ({
								...prev,
								description: newContent
							}))
						}
					/>
				</div>

				{/* Image Upload Section */}
				<div>
					<label>Upload Image</label>
					<div className='border-2 border-dashed p-6 rounded-lg text-center cursor-pointer'>
						<input
							type='file'
							accept='image/*'
							onChange={e => onDrop(e.target.files!)}
						/>
					</div>

					<div className='mt-4'>
						{imagePreviews.length > 0 && (
							<div>
								{imagePreviews.map((preview, idx) => (
									<div key={idx} className='relative group'>
										<Image
											src={preview}
											alt={`Preview ${idx + 1}`}
											width={100}
											height={100}
											className='object-cover rounded-lg'
										/>
										<button
											type='button'
											onClick={() =>
												setImagePreviews(prev =>
													prev.filter(
														(_, i) => i !== idx
													)
												)
											}
											className='absolute top-1 right-1 bg-red-600 text-white rounded-full p-1'
										>
											<X size={20} />
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className='flex justify-between mt-4'>
					<Button
						type='button'
						onClick={handleImageUpload}
						disabled={imageUploading || !images.length}
					>
						{imageUploading ? 'Uploading...' : 'Upload Image'}
					</Button>
					<Button type='submit' disabled={loading || !form.imageUrl}>
						{loading ? 'Saving...' : 'Create Package'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default HolidayPackageCreatePage
