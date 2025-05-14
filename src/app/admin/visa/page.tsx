'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, Edit, UploadCloud, X } from 'lucide-react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

type Visa = {
	_id?: string
	country: string
	countryCode: string
	visaType: string
	visaMode: string
	entryType: string
	processingTime: string
	visaValidity: string
	maxStay: string
	description?: string
	content?: string
	countryImage: string
}

export default function AdminVisaPage() {
	const [visas, setVisas] = useState<Visa[]>([])
	const [form, setForm] = useState<Visa>({
		country: '',
		countryCode: '',
		visaType: 'Tourist Visa',
		visaMode: 'E-Visa',
		entryType: 'Single Entry',
		processingTime: '45 Working Days',
		visaValidity: '90 Days From Issue',
		maxStay: '60 Days From Entry',
		description: '',
		countryImage: '',
		content: ''
	})
	const [editingId, setEditingId] = useState<string | null>(null)
	const [imageUploading, setImageUploading] = useState<boolean>(false)
	const [imagePreview, setImagePreview] = useState<string | null>(null)

	// Dropzone for image upload
	const [images, setImages] = useState<File[]>([])
	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages(prev => [...prev, ...acceptedFiles])
	}, [])
	const removeImage = (index: number) => {
		setImages(prev => prev.filter((_, i) => i !== index))
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		multiple: true
	})

	// Set the uploaded image URL to form
	const handleImageUpload = async () => {
		if (images.length === 0) return

		setImageUploading(true)
		const formData = new FormData()
		formData.append('file', images[0]) // Assume uploading the first image

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			})
			const data = await res.json()

			if (data?.imageUrl) {
				setForm(prev => ({ ...prev, countryImage: data.imageUrl }))
				setImagePreview(data.imageUrl) // Set preview image
				toast.success('Image uploaded successfully!')
			} else {
				toast.error('Image upload failed.')
			}
		} catch (error) {
			toast.error('Error uploading image.')
		} finally {
			setImageUploading(false)
		}
	}

	// Fetch visa records
	const fetchVisas = async () => {
		const res = await fetch('/api/visa')
		const data = await res.json()
		setVisas(data)
	}

	useEffect(() => {
		fetchVisas()
	}, [])

	// Handle form submission for create or update
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Basic validation
		if (!form.country || !form.countryCode || !form.countryImage) {
			toast.error(
				'Please fill out all fields including the country image.'
			)
			return
		}

		const method = editingId ? 'PUT' : 'POST'
		const url = editingId ? `/api/visa/${editingId}` : '/api/visa'

		// Send request to create or update visa record
		const res = await fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		})

		if (res.ok) {
			setEditingId(null)
			setForm({
				country: '',
				countryCode: '',
				visaType: 'Tourist Visa',
				visaMode: 'E-Visa',
				entryType: 'Single Entry',
				processingTime: '45 Working Days',
				visaValidity: '90 Days From Issue',
				maxStay: '60 Days From Entry',
				description: '',
				countryImage: '',
				content: ''
			})
			await fetchVisas()
		}
	}

	// Handle deletion of visa record
	const handleDelete = async (id: string) => {
		await fetch(`/api/visa/${id}`, { method: 'DELETE' })
		await fetchVisas()
	}

	// Handle editing of a visa record
	const handleEdit = (visa: Visa) => {
		setForm(visa)
		setEditingId(visa._id || null)
	}

	return (
		<div className='bg-white rounded-lg p-6 space-y-6'>
			<h1 className='text-2xl font-bold'>Visa Management</h1>

			{/* Form for Visa details */}
			<div className='grid grid-cols-2 gap-4'>
				{/* Country input */}
				<Input
					placeholder='Country'
					value={form.country}
					onChange={e =>
						setForm({ ...form, country: e.target.value })
					}
				/>
				{/* Country Code input */}
				<Input
					placeholder='Country Code'
					value={form.countryCode}
					onChange={e =>
						setForm({ ...form, countryCode: e.target.value })
					}
				/>
				{/* Processing Time input */}
				<Input
					placeholder='Processing Time'
					value={form.processingTime}
					onChange={e =>
						setForm({ ...form, processingTime: e.target.value })
					}
				/>
				{/* Visa Validity input */}
				<Input
					placeholder='Visa Validity'
					value={form.visaValidity}
					onChange={e =>
						setForm({ ...form, visaValidity: e.target.value })
					}
				/>
				{/* Max Stay input */}
				<Input
					placeholder='Max Stay'
					value={form.maxStay}
					onChange={e =>
						setForm({ ...form, maxStay: e.target.value })
					}
				/>
			</div>

			{/* Image Upload */}
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
				<span className='text-sm text-gray-400'>
					Only image files are allowed
				</span>
			</div>

			{/* Image Preview */}
			{imagePreview && (
				<div className='mt-4'>
					<Image
						src={imagePreview}
						alt='Image Preview'
						width={100}
						height={100}
						className='object-cover rounded-md'
					/>
				</div>
			)}

			{/* Upload Button */}
			<button
				type='button'
				onClick={handleImageUpload}
				className='w-full mt-4 py-2 bg-blue-600 text-white rounded-md'
				disabled={imageUploading} // Disable the button while image is uploading
			>
				{imageUploading ? 'Uploading...' : 'Upload Image'}
			</button>

			{/* Submit Button */}
			<Button
				onClick={handleSubmit}
				disabled={!form.countryImage} // Disable the submit button if image is not uploaded
			>
				{editingId ? 'Update Visa' : 'Create Visa'}
			</Button>

			{/* Visa Table */}
			<div className='pt-6'>
				<table className='w-full border text-left text-sm'>
					<thead className='bg-gray-100'>
						<tr>
							<th className='p-2'>Country</th>
							<th className='p-2'>Code</th>
							<th className='p-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{visas.map(visa => (
							<tr key={visa._id} className='border-t'>
								<td className='p-2'>{visa.country}</td>
								<td className='p-2'>{visa.countryCode}</td>
								<td className='p-2 flex gap-2'>
									<Button
										size='sm'
										variant='outline'
										onClick={() => handleEdit(visa)}
									>
										<Edit size={16} />
									</Button>
									<Button
										size='sm'
										variant='danger'
										onClick={() => handleDelete(visa._id!)}
									>
										<Trash2 size={16} />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
