'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Select, { SingleValue } from 'react-select'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X } from 'lucide-react'
import { IHoliday } from '@/types/IHoliday'
import { getAllLocations, createLocation } from '@/services/locationService'
import {
	getAllHolidays,
	createHoliday,
	updateHoliday,
	deleteHoliday
} from '@/services/holidayService'
import apiClient from '@/configs/apiConfig'

type LocationOption = { label: string; value: string }

interface FormState {
	title: string
	price: string
	location: LocationOption | null
	nightsInfo: string
	description: string
	tags: string[]
	imageUrl: string
}

const tagOptions = [
	{ label: 'Hotel', value: 'Hotel' },
	{ label: 'Transfer', value: 'Transfer' },
	{ label: 'Meals', value: 'Meals' },
	{ label: 'Visa', value: 'Visa' },
	{ label: 'Tour', value: 'Tour' }
]

const AdminHolidayPage = () => {
	const [locations, setLocations] = useState<LocationOption[]>([])
	const [newLocation, setNewLocation] = useState('')
	const [form, setForm] = useState<FormState>({
		title: '',
		price: '',
		location: null,
		nightsInfo: '',
		description: '',
		tags: [],
		imageUrl: ''
	})
	const [packages, setPackages] = useState<IHoliday[]>([])
	const [images, setImages] = useState<File[]>([])
	const [imagePreviews, setImagePreviews] = useState<string[]>([])
	const [imageUploading, setImageUploading] = useState(false)
	const [loading, setLoading] = useState(false)
	const [editingId, setEditingId] = useState<string | null>(null)
	const [imageUploaded, setImageUploaded] = useState(false)
	const router = useRouter()

	useEffect(() => {
		loadLocations()
		loadPackages()
	}, [])

	const loadLocations = async () => {
		try {
			const data = await getAllLocations()
			setLocations(
				data.map((loc: any) => ({ label: loc.name, value: loc.id }))
			)
		} catch {
			toast.error('Failed to load locations')
		}
	}

	const loadPackages = async () => {
		try {
			const data = await getAllHolidays()
			setPackages(data)
		} catch {
			toast.error('Failed to load holiday packages')
		}
	}

	const addNewLocation = async () => {
		const trimmed = newLocation.trim()
		if (!trimmed) return toast.error('Please enter a location name')

		if (
			locations.find(
				loc => loc.label.toLowerCase() === trimmed.toLowerCase()
			)
		) {
			return toast.error('Location already exists')
		}

		try {
			const newLoc = await createLocation(trimmed)
			const newLocOption = { label: newLoc.name, value: newLoc.id }
			setLocations(prev => [...prev, newLocOption])
			setForm(prev => ({ ...prev, location: newLocOption }))
			setNewLocation('')
			toast.success('Location added and selected')
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message || 'Error adding location'
			)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleTagChange = (selectedTags: any) => {
		const selectedValues = selectedTags
			? selectedTags.map((item: any) => item.value)
			: []
		setForm(prev => ({ ...prev, tags: selectedValues }))
	}

	const handleLocationChange = (selected: SingleValue<LocationOption>) => {
		setForm(prev => ({ ...prev, location: selected }))
	}

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages(acceptedFiles)
		setImagePreviews(acceptedFiles.map(file => URL.createObjectURL(file)))
		setImageUploaded(false)
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		multiple: false
	})

	const removeImage = () => {
		setImages([])
		setImagePreviews([])
		setForm(prev => ({ ...prev, imageUrl: '' }))
		setImageUploaded(false)
	}

	const uploadImages = async () => {
		if (!images.length) return
		setImageUploading(true)
		const formData = new FormData()
		formData.append('file', images[0])

		try {
			const res = await apiClient.post('/upload', formData)
			const { imageUrl } = res.data
			if (!imageUrl) throw new Error('No image URL returned')

			setForm(prev => ({ ...prev, imageUrl }))
			setImageUploaded(true)
			toast.success('Image uploaded successfully!')
		} catch (error) {
			toast.error('Image upload failed')
		} finally {
			setImageUploading(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!form.imageUrl) return toast.error('Please upload an image.')
		if (!form.location) return toast.error('Please select a location.')

		const payload = {
			...form,
			price: parseFloat(form.price),
			location: form.location.value,
			tags: form.tags
		}

		setLoading(true)

		try {
			if (editingId) {
				await updateHoliday(editingId, payload)
				toast.success('Package updated successfully')
			} else {
				await createHoliday(payload)
				toast.success('Package created successfully')
			}
			resetForm()
			loadPackages()
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Submission failed')
		} finally {
			setLoading(false)
		}
	}

	const resetForm = () => {
		setForm({
			title: '',
			price: '',
			location: null,
			nightsInfo: '',
			description: '',
			tags: [],
			imageUrl: ''
		})
		setImages([])
		setImagePreviews([])
		setEditingId(null)
		setImageUploaded(false)
	}

	const handleEdit = (pkg: IHoliday) => {
		setEditingId(pkg.id)
		setForm({
			title: pkg.title,
			price: pkg.price.toString(),
			location:
				typeof pkg.location === 'string'
					? { label: pkg.location, value: pkg.location }
					: { label: pkg.location.name, value: pkg.location._id },
			nightsInfo: pkg.nightsInfo,
			description: pkg.description || '',
			tags: pkg.tags,
			imageUrl: pkg.imageUrl
		})
		setImageUploaded(true)
		setImagePreviews([pkg.imageUrl])
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this package?')) return
		try {
			await deleteHoliday(id)
			toast.success('Deleted successfully')
			loadPackages()
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Failed to delete')
		}
	}

	return (
		<div className='p-6 space-y-6 bg-white rounded-lg w-full mx-auto'>
			<h1 className='text-2xl font-bold'>Holiday</h1>

			{/* Add New Location */}
			<section className='mb-6'>
				<label className='block font-medium mb-1'>
					Add New Location
				</label>
				<div className='flex gap-2'>
					<input
						type='text'
						className='border border-gray-300 rounded px-3 py-2 flex-grow'
						value={newLocation}
						onChange={e => setNewLocation(e.target.value)}
						placeholder='Enter new location name'
					/>
					<Button onClick={addNewLocation}>Add Location</Button>
				</div>
			</section>

			{/* Select Location */}
			<section className='mb-6'>
				<label className='block font-medium mb-1'>
					Select Location
				</label>
				<Select
					options={locations}
					value={form.location}
					onChange={handleLocationChange}
					placeholder='Select a location'
					isSearchable
					isClearable
				/>
			</section>

			{/* Form */}
			<form
				onSubmit={handleSubmit}
				className='grid grid-cols-1 md:grid-cols-2 gap-4'
			>
				<Input
					name='title'
					placeholder='Title'
					value={form.title}
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
					name='nightsInfo'
					placeholder='Nights Info'
					value={form.nightsInfo}
					onChange={handleInputChange}
					required
				/>

				{/* Tags Selection */}
				<div className=''>
					<Select
						isMulti
						options={tagOptions}
						value={form.tags.map(tag =>
							tagOptions.find(opt => opt.value === tag)
						)}
						onChange={handleTagChange}
						placeholder='Select tags'
					/>
				</div>
				<div className='col-span-full'>
					<Input
						name='description'
						placeholder='Description'
						value={form.description}
						onChange={handleInputChange}
					/>
				</div>
				{/* Image Upload */}
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
									alt={`Preview ${index}`}
									width={100}
									height={100}
									className='object-cover rounded-lg'
								/>
								<button
									type='button'
									onClick={removeImage}
									className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition'
								>
									<X className='w-4 h-4' />
								</button>
							</div>
						))}
					</div>

					{!imageUploaded && (
						<Button
							type='button'
							onClick={uploadImages}
							disabled={imageUploading || !images.length}
						>
							{imageUploading ? 'Uploading...' : 'Upload Image'}
						</Button>
					)}
				</div>

				<Button type='submit' disabled={loading || !imageUploaded}>
					{loading
						? 'Saving...'
						: editingId
							? 'Update Package'
							: 'Create Package'}
				</Button>
			</form>

			{/* List View */}
			<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
				{packages.map(pkg => (
					<article
						key={pkg.id}
						className='border rounded-lg p-4 bg-white shadow-md flex flex-col justify-between'
					>
						<div>
							<h2 className='text-lg font-semibold'>
								{pkg.title}
							</h2>
							<p className='text-sm text-muted-foreground'>
								{typeof pkg.location === 'string'
									? pkg.location
									: pkg.location?.name || ''}
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
					</article>
				))}
			</section>
		</div>
	)
}

export default AdminHolidayPage
