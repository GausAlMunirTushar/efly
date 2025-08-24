'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/components/form/Button'
import { UploadCloud } from 'lucide-react'
import Select from 'react-select'
import Input from '@/components/form/Input'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { createHoliday } from '@/services/holidayService'
import { getAllLocations } from '@/services/locationService'
import { SingleValue } from 'react-select'
import apiClient from '@/configs/apiConfig'

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

	// Form state type
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

	// Load locations for select dropdown
	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const data = await getAllLocations()
				setLocations(
					data.map((loc: any) => ({ label: loc.name, value: loc.id }))
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

	const uploadImage = async () => {
		if (!images.length) return
		setImageUploading(true)
		const formData = new FormData()
		formData.append('file', images[0])

		try {
			const res = await apiClient.post('/upload', formData)
			const { imageUrl } = res.data
			setForm(prev => ({ ...prev, imageUrl }))
			toast.success('Image uploaded successfully!')
		} catch {
			toast.error('Image upload failed!')
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
			toast.error('Please upload an image.')
			return
		}

		const payload = {
			...form,
			price: parseFloat(form.price),
			location: form.location?.value || ''
		}

		try {
			await createHoliday(payload)
			toast.success('Holiday package created successfully!')
			router.push('/admin/holiday')
		} catch (error) {
			toast.error('Failed to create holiday package.')
		}
	}

	return (
		<div className='p-6 bg-white rounded-lg'>
			<h2 className='text-xl font-semibold'>Create Holiday Package</h2>
			<form onSubmit={handleSubmit}>
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
				<Input
					name='description'
					placeholder='Description'
					value={form.description}
					onChange={handleInputChange}
				/>

				<div className='my-4'>
					<label>Select Location</label>
					<Select
						options={locations}
						value={form.location}
						onChange={handleLocationChange}
					/>
				</div>

				<div className='my-4'>
					<label>Tags</label>
					<Select
						isMulti
						options={[
							{ label: 'Hotel', value: 'Hotel' },
							{ label: 'Visa', value: 'Visa' }
						]}
						value={form.tags.map(tag => ({
							label: tag,
							value: tag
						}))}
						onChange={handleTagChange}
					/>
				</div>

				<div className='my-4'>
					<label>Upload Image</label>
					<div>
						<input
							type='file'
							accept='image/*'
							onChange={e => setImages([e.target.files![0]])}
						/>
						<button
							type='button'
							onClick={uploadImage}
							disabled={imageUploading || !images.length}
						>
							{imageUploading ? 'Uploading...' : 'Upload Image'}
						</button>
					</div>

					{imagePreviews.length > 0 && (
						<div>
							{imagePreviews.map((preview, idx) => (
								<img
									key={idx}
									src={preview}
									alt={`Preview ${idx + 1}`}
									width={100}
									height={100}
								/>
							))}
						</div>
					)}
				</div>

				<Button type='submit'>Create Package</Button>
			</form>
		</div>
	)
}

export default HolidayPackageCreatePage
