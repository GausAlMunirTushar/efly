'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { getHolidayById, updateHoliday } from '@/services/holidayService'
import Title from '@/components/common/Title'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { UploadCloud, X } from 'lucide-react'
import Select from 'react-select'
import { SingleValue } from 'react-select'
import JoditEditor from 'jodit-react'
import { getAllLocations } from '@/services/locationService'
import apiClient from '@/configs/apiConfig'

type FormState = {
	title: string
	price: string
	description: string
	location: LocationOption | null
	tags: string[]
	imageUrl: string
}

type LocationOption = { label: string; value: string }

const HolidayPackageEditPage = () => {
	const { id } = useParams<{ id: string }>()
	const router = useRouter()

	const [form, setForm] = useState<FormState>({
		title: '',
		price: '',
		description: '',
		location: null,
		tags: [],
		imageUrl: ''
	})
	const [locations, setLocations] = useState<LocationOption[]>([])
	const [newLocation, setNewLocation] = useState<string>('')
	const [images, setImages] = useState<File[]>([])
	const [imagePreviews, setImagePreviews] = useState<string[]>([])
	const [imageUploading, setImageUploading] = useState(false)
	const [loading, setLoading] = useState(false)

	// Load holiday package details and locations
	useEffect(() => {
		if (id) {
			fetchHoliday(id)
		}
		loadLocations()
	}, [id])

	const fetchHoliday = async (id: string) => {
		try {
			const data = await getHolidayById(id)
			setForm({
				title: data.title,
				price: data.price.toString(),
				description: data.description,
				location: {
					label: data.location.name,
					value: data.location._id
				},
				tags: data.tags,
				imageUrl: data.imageUrl
			})
			setImagePreviews([data.imageUrl])
		} catch (error) {
			toast.error('Failed to load holiday package details.')
		}
	}

	const loadLocations = async () => {
		try {
			const data = await getAllLocations()
			setLocations(
				data.map((loc: any) => ({ label: loc.name, value: loc.id }))
			)
		} catch {
			toast.error('Failed to load locations.')
		}
	}

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
			setImagePreviews([imageUrl])
			toast.success('Image uploaded successfully!')
		} catch {
			toast.error('Image upload failed!')
		} finally {
			setImageUploading(false)
		}
	}

	const removeImage = () => {
		setImages([])
		setImagePreviews([])
		setForm(prev => ({ ...prev, imageUrl: '' }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setLoading(true)

		try {
			const payload = {
				...form,
				price: parseFloat(form.price),
				location: form.location?.value || ''
			}

			await updateHoliday(id, payload)
			toast.success('Holiday package updated successfully!')
			router.push('/admin/holidays')
		} catch (error) {
			toast.error('Failed to update holiday package.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-6 bg-white rounded-lg min-h-screen'>
			<div className='flex items-center justify-between mb-4'>
				<Title>Edit Holiday Package</Title>
				<Link href='/admin/holiday'>
					<Button size='sm'>
						<ArrowLeft size={16} />
					</Button>
				</Link>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				{/* Title and Price Inputs */}
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

					<div className='mt-4'>
						{imagePreviews.length > 0 && (
							<div>
								{imagePreviews.map((preview, idx) => (
									<div key={idx} className='relative group'>
										<img
											src={preview}
											alt={`Preview ${idx + 1}`}
											width={100}
											height={100}
											className='object-cover rounded-lg'
										/>
										<button
											type='button'
											onClick={removeImage}
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

				{/* Submit Button */}
				<Button type='submit' disabled={loading}>
					{loading ? 'Saving...' : 'Update Package'}
				</Button>
			</form>
		</div>
	)
}

export default HolidayPackageEditPage
