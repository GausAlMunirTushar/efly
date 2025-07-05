'use client'

import { useState, useEffect, useCallback } from 'react'
import { Trash2, Edit, UploadCloud } from 'lucide-react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import dynamic from 'next/dynamic'

import {
	getVisas,
	createVisa,
	updateVisa,
	deleteVisa
} from '@/services/visaService'
import { getCountries } from '@/services/countryService'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

// Country type
type Country = {
	_id: string
	name: string
	countryCode: string
	image: string
}

// API response type
type VisaFromAPI = {
	_id: string
	country: Country
	visaType: string
	visaMode?: string
	processingTime: string
	visaValidity: string
	maxStay: string
	description?: string
	visaFee?: string
	serviceCharge?: string
}

// Form data type
type VisaFormData = {
	_id?: string
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

export default function AdminVisaPage() {
	const [visas, setVisas] = useState<VisaFromAPI[]>([])
	const [countries, setCountries] = useState<Country[]>([])

	const [form, setForm] = useState<VisaFormData>({
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

	const [editingId, setEditingId] = useState<string | null>(null)
	const [imageUploading, setImageUploading] = useState(false)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [images, setImages] = useState<File[]>([])

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages(prev => [...prev, ...acceptedFiles])
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		multiple: false
	})

	const fetchAllData = useCallback(async () => {
		try {
			const [visaData, countryData] = await Promise.all([
				getVisas(),
				getCountries()
			])

			setVisas(visaData)
			setCountries(countryData)
		} catch (err: any) {
			toast.error(err.message || 'Failed to fetch data')
		}
	}, [])

	useEffect(() => {
		fetchAllData()
	}, [fetchAllData])

	const handleImageUpload = async () => {
		if (images.length === 0) {
			toast.error('Please select an image.')
			return
		}

		setImageUploading(true)
		const formData = new FormData()
		formData.append('file', images[0])

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			})
			const data = await res.json()
			if (data?.imageUrl) {
				setForm(prev => ({ ...prev, countryImage: data.imageUrl }))
				setImagePreview(data.imageUrl)
				toast.success('Image uploaded.')
			} else {
				toast.error('Upload failed.')
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
			toast.error('Please fill country, code, and image.')
			return
		}

		const visaPayload = {
			...form,
			country: {
				_id: form.country,
				name: '',
				countryCode: form.countryCode,
				image: form.countryImage
			}
		}

		try {
			if (editingId) {
				await updateVisa(editingId, visaPayload)
				toast.success('Visa updated.')
			} else {
				await createVisa(visaPayload)
				toast.success('Visa created.')
			}
			resetForm()
			fetchAllData()
		} catch (err: any) {
			toast.error(err.message || 'Error saving visa.')
		}
	}

	const resetForm = () => {
		setEditingId(null)
		setForm({
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
		setImagePreview(null)
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Delete this visa?')) return
		try {
			await deleteVisa(id)
			toast.success('Visa deleted.')
			fetchAllData()
		} catch (err: any) {
			toast.error(err.message || 'Delete failed.')
		}
	}

	const handleEdit = (visa: VisaFromAPI) => {
		setEditingId(visa._id)
		setForm({
			country: visa.country._id,
			countryCode: visa.country.countryCode,
			countryImage: visa.country.image,
			visaType: visa.visaType,
			visaMode: visa.visaMode || 'E-Visa',
			processingTime: visa.processingTime,
			visaValidity: visa.visaValidity,
			maxStay: visa.maxStay,
			description: visa.description || '',
			visaFee: visa.visaFee || '',
			serviceCharge: visa.serviceCharge || ''
		})
		setImagePreview(visa.country.image)
	}

	return (
		<div className='bg-white p-8 rounded-lg max-w-5xl mx-auto shadow-md'>
			<h1 className='text-3xl font-bold mb-6 text-center'>
				Visa Management
			</h1>

			<form onSubmit={handleSubmit} className='space-y-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label className='block text-sm font-semibold text-gray-700'>
							Country
						</label>
						<select
							className='w-full border rounded-md p-3 mt-1'
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
					<div>
						<Input
							placeholder='Country Code'
							value={form.countryCode}
							disabled
							className='p-3 mt-1'
						/>
					</div>
				</div>

				{/* Image Upload */}
				<div
					{...getRootProps()}
					className='border-2 border-dashed p-6 rounded-md text-center cursor-pointer'
				>
					<input {...getInputProps()} />
					<UploadCloud className='w-12 h-12 mx-auto text-gray-500' />
					<p className='text-gray-600'>
						{isDragActive
							? 'Drop the image...'
							: 'Drag & drop image or click'}
					</p>
				</div>

				{/* Preview */}
				{imagePreview && (
					<div className='mt-4 text-center'>
						<Image
							src={imagePreview}
							alt='Country'
							width={120}
							height={120}
							className='rounded-md'
						/>
					</div>
				)}

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
					<Input
						placeholder='Visa Fee'
						value={form.visaFee}
						onChange={e =>
							setForm({ ...form, visaFee: e.target.value })
						}
					/>
					<Input
						placeholder='Service Charge'
						value={form.serviceCharge}
						onChange={e =>
							setForm({ ...form, serviceCharge: e.target.value })
						}
					/>
					<JoditEditor
						value={form.description || ''}
						config={{
							readonly: false,
							placeholder: 'Enter description...'
						}}
						onBlur={newContent =>
							setForm({ ...form, description: newContent })
						}
					/>
				</div>

				<Button type='submit' className='w-full py-3 mt-6'>
					{editingId ? 'Update Visa' : 'Create Visa'}
				</Button>
			</form>

			{/* Table */}
			<div className='mt-12'>
				<h2 className='text-xl font-semibold mb-4 text-gray-700'>
					Existing Visas
				</h2>
				<table className='w-full table-auto border-collapse'>
					<thead className='bg-gray-100'>
						<tr>
							<th className='p-3 text-left'>Country</th>
							<th className='p-3 text-left'>Code</th>
							<th className='p-3 text-left'>Processing Time</th>
							<th className='p-3 text-left'>Visa Validity</th>
							<th className='p-3 text-left'>Max Stay</th>
							<th className='p-3 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{visas.map(visa => (
							<tr key={visa._id} className='border-t'>
								<td className='p-3'>{visa.country.name}</td>
								<td className='p-3'>
									{visa.country.countryCode}
								</td>
								<td className='p-3'>{visa.processingTime}</td>
								<td className='p-3'>{visa.visaValidity}</td>
								<td className='p-3'>{visa.maxStay}</td>
								<td className='p-3'>
									<Button
										size='sm'
										variant='outline'
										onClick={() => handleEdit(visa)}
										className='mr-2'
									>
										<Edit size={16} />
									</Button>
									<Button
										size='sm'
										variant='danger'
										onClick={() => handleDelete(visa._id)}
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
