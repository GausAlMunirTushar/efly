'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Button from '@/components/form/Button'
import { ArrowLeft } from 'lucide-react'
import Select from 'react-select'
import Input from '@/components/form/Input'
import dynamic from 'next/dynamic'
import { createVisa } from '@/services/visaService'
import { getCountries } from '@/services/countryService'
import apiClient from '@/configs/apiConfig'
import Title from '@/components/common/Title'
import Link from 'next/link'
import Image from 'next/image'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

type FormState = {
	country: string // Country ID
	countryCode: string
	countryImage: string
	visaType: string
	visaMode: string
	processingTime: string
	visaValidity: string
	maxStay: string
	description?: string
	visaFee?: string
	serviceCharge?: string
}

type Country = {
	_id: string
	name: string
	countryCode: string
	image: string
}

const VisaCreatePage = () => {
	const router = useRouter()
	const [form, setForm] = useState<FormState>({
		country: '',
		countryCode: '',
		countryImage: '',
		visaType: 'Tourist Visa',
		visaMode: 'E-Visa',
		processingTime: '',
		visaValidity: '',
		maxStay: '',
		description: ''
	})

	const [countries, setCountries] = useState<Country[]>([])
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [images, setImages] = useState<File[]>([])
	const [imageUploading, setImageUploading] = useState(false)

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const data = await getCountries()
				setCountries(data)
			} catch (err) {
				toast.error('Failed to load countries')
			}
		}
		fetchCountries()
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleImageUpload = async () => {
		if (images.length === 0) {
			toast.error('Please select an image.')
			return
		}

		setImageUploading(true)
		const formData = new FormData()
		formData.append('file', images[0])

		try {
			const res = await apiClient.post('/upload', formData)
			const data = res.data
			if (data?.imageUrl) {
				setForm(prev => ({ ...prev, countryImage: data.imageUrl }))
				setImagePreview(data.imageUrl)
				toast.success('Image uploaded successfully.')
			} else {
				toast.error('Image upload failed.')
			}
		} catch {
			toast.error('Error uploading image.')
		} finally {
			setImageUploading(false)
			setImages([])
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!form.country || !form.countryCode || !form.countryImage) {
			toast.error('Please fill country, country code, and image.')
			return
		}

		const visaPayload = {
			...form,
			country: {
				_id: form.country, // Pass country ID
				countryCode: form.countryCode,
				image: form.countryImage,
				name: '' // Assuming you will populate the country name when necessary
			}
		}

		try {
			await createVisa(visaPayload)
			toast.success('Visa created successfully.')
			router.push('/admin/visa')
		} catch (err: any) {
			toast.error(err.message || 'Error saving visa.')
		}
	}

	const handleCountrySelectChange = (selected: any) => {
		// Update the form with the selected country details (ID, countryCode, image)
		setForm(prev => ({
			...prev,
			country: selected.value, // Get country ID
			countryCode: selected.countryCode,
			countryImage: selected.image
		}))
	}

	return (
		<div className='p-6 bg-white rounded-lg min-h-screen'>
			<div className='flex items-center justify-between mb-4'>
				<Title>Create Visa</Title>
				<Link href='/admin/visa'>
					<Button size='sm'>
						<ArrowLeft size={16} />
					</Button>
				</Link>
			</div>

			<form onSubmit={handleSubmit} className='space-y-6 mt-4'>
				{/* Select Country */}
				<div>
					<select
						className='w-full border rounded-md p-2.5 mt-1'
						value={form.country}
						onChange={e => {
							const selected = countries.find(
								c => c._id === e.target.value
							)
							if (!selected) return
							setForm(prev => ({
								...prev,
								country: selected._id,
								countryCode: selected.countryCode,
								countryImage: selected.image
							}))
							setImagePreview(selected.image || null)
						}}
					>
						<option value=''>Select Country</option>
						{countries.map(c => (
							<option key={c._id} value={c._id}>
								{c.name}
							</option>
						))}
					</select>
				</div>

				{/* Country Code Input */}
				<Input
					placeholder='Country Code'
					value={form.countryCode}
					onChange={e =>
						setForm({ ...form, countryCode: e.target.value })
					}
				/>

				{/* Image Upload Section */}
				<div>
					<label>Upload Image</label>
					<div className='border-2 border-dashed p-6 rounded-lg text-center cursor-pointer'>
						<input
							type='file'
							accept='image/*'
							onChange={e => setImages([e.target.files![0]])}
						/>
					</div>
				</div>

				{imagePreview && (
					<div className='mt-4 text-center'>
						<Image
							src={imagePreview}
							alt='Image Preview'
							width={120}
							height={120}
							className='rounded-md'
						/>
					</div>
				)}

				{/* Image Upload Button */}
				<Button
					type='button'
					onClick={handleImageUpload}
					disabled={imageUploading}
					className='w-full mt-4'
				>
					{imageUploading ? 'Uploading...' : 'Upload Image'}
				</Button>

				{/* Visa Info */}
				<div className='mt-8 space-y-3'>
					<Input
						placeholder='Processing Time'
						value={form.processingTime}
						onChange={e =>
							setForm({ ...form, processingTime: e.target.value })
						}
					/>
					<Input
						placeholder='Visa Validity'
						value={form.visaValidity}
						onChange={e =>
							setForm({ ...form, visaValidity: e.target.value })
						}
					/>
					<Input
						placeholder='Max Stay'
						value={form.maxStay}
						onChange={e =>
							setForm({ ...form, maxStay: e.target.value })
						}
					/>
					<JoditEditor
						value={form.description || ''}
						onChange={newContent =>
							setForm({ ...form, description: newContent })
						}
					/>
				</div>

				<Button type='submit' className='w-full py-3 mt-6'>
					Create Visa
				</Button>
			</form>
		</div>
	)
}

export default VisaCreatePage
