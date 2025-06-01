'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Plus, Trash2, Edit, UploadCloud } from 'lucide-react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import dynamic from 'next/dynamic'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

type EntryTypeOption = 'Single Entry' | 'Double Entry' | 'Multiple Entry'

type VisaEntryType = {
	entryType: EntryTypeOption
	processingTime: string
	visaValidity: string
	maxStay: string
	description?: string
	content?: string
}

type Visa = {
	_id?: string
	country: string
	countryCode: string
	countryImage: string
	visaType: 'Tourist Visa'
	visaMode: 'E-Visa'
	entryTypes: VisaEntryType[]
}

export default function AdminVisaPage() {
	const [visas, setVisas] = useState<Visa[]>([])
	const [form, setForm] = useState<Visa>({
		country: '',
		countryCode: '',
		countryImage: '',
		visaType: 'Tourist Visa',
		visaMode: 'E-Visa',
		entryTypes: []
	})
	const [editingId, setEditingId] = useState<string | null>(null)
	const [imageUploading, setImageUploading] = useState(false)
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

	// Upload image and update form
	const handleImageUpload = async () => {
		if (images.length === 0) {
			toast.error('Please select an image to upload.')
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
				toast.success('Image uploaded successfully!')
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

	// Fetch all visas
	const fetchVisas = useCallback(async () => {
		try {
			const res = await fetch('/api/visa', { cache: 'no-store' })
			if (!res.ok) throw new Error('Failed to fetch visas')
			const data = await res.json()
			setVisas(data)
		} catch (error) {
			toast.error((error as Error).message || 'Failed to load visas')
		}
	}, [])

	useEffect(() => {
		fetchVisas()
	}, [fetchVisas])

	// Add new empty entry type form section
	const addEntryType = () => {
		const allEntryTypes: EntryTypeOption[] = [
			'Single Entry',
			'Double Entry',
			'Multiple Entry'
		]

		const unusedEntryTypes = allEntryTypes.filter(
			type => !form.entryTypes.some(et => et.entryType === type)
		) as EntryTypeOption[]

		if (unusedEntryTypes.length === 0) {
			toast.info('All entry types are already added.')
			return
		}

		const newEntry: VisaEntryType = {
			entryType: unusedEntryTypes[0],
			processingTime: '',
			visaValidity: '',
			maxStay: '',
			description: '',
			content: ''
		}
		setForm(prev => ({
			...prev,
			entryTypes: [...prev.entryTypes, newEntry]
		}))
	}

	// Remove entry type by index
	const removeEntryType = (index: number) => {
		setForm(prev => ({
			...prev,
			entryTypes: prev.entryTypes.filter((_, i) => i !== index)
		}))
	}

	// Update entry type data at index
	const updateEntryType = (
		index: number,
		key: keyof VisaEntryType,
		value: any
	) => {
		setForm(prev => {
			const updated = [...prev.entryTypes]
			updated[index] = { ...updated[index], [key]: value }
			return { ...prev, entryTypes: updated }
		})
	}

	// Handle submit (create or update)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!form.country || !form.countryCode || !form.countryImage) {
			toast.error('Country, Country Code, and Image are required.')
			return
		}
		if (form.entryTypes.length === 0) {
			toast.error('Add at least one entry type.')
			return
		}

		for (const et of form.entryTypes) {
			if (!et.processingTime || !et.visaValidity || !et.maxStay) {
				toast.error(`Fill all fields for entry type: ${et.entryType}`)
				return
			}
		}

		const method = editingId ? 'PUT' : 'POST'
		const url = editingId ? `/api/visa/${editingId}` : '/api/visa'
		const res = await fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		})

		if (res.ok) {
			toast.success(editingId ? 'Visa updated!' : 'Visa created!')
			setEditingId(null)
			setForm({
				country: '',
				countryCode: '',
				countryImage: '',
				visaType: 'Tourist Visa',
				visaMode: 'E-Visa',
				entryTypes: []
			})
			setImagePreview(null)
			await fetchVisas()
		} else {
			toast.error('Failed to save visa.')
		}
	}

	// Handle delete
	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure to delete this visa?')) return
		const res = await fetch(`/api/visa/${id}`, { method: 'DELETE' })
		if (res.ok) {
			toast.success('Visa deleted.')
			await fetchVisas()
		} else {
			toast.error('Failed to delete visa.')
		}
	}

	// Handle edit (load visa data into form)
	const handleEdit = (visa: Visa) => {
		setEditingId(visa._id || null)
		setForm({
			country: visa.country,
			countryCode: visa.countryCode,
			countryImage: visa.countryImage,
			visaType: visa.visaType,
			visaMode: visa.visaMode,
			entryTypes: visa.entryTypes.length ? visa.entryTypes : []
		})
		setImagePreview(visa.countryImage || null)
	}

	// JoditEditor config memo
	const joditConfig = useMemo(
		() => ({
			readonly: false,
			placeholder: 'Start typing description or content...'
		}),
		[]
	)

	return (
		<div className='bg-white rounded-lg p-6 space-y-6 max-w-5xl mx-auto'>
			<h1 className='text-2xl font-bold'>Visa Management</h1>

			<form onSubmit={handleSubmit} className='space-y-4'>
				{/* Country Details */}
				<div className='grid grid-cols-2 gap-4'>
					<Input
						placeholder='Country'
						value={form.country}
						onChange={e =>
							setForm({ ...form, country: e.target.value })
						}
						required
					/>
					<Input
						placeholder='Country Code'
						value={form.countryCode}
						onChange={e =>
							setForm({ ...form, countryCode: e.target.value })
						}
						required
					/>
				</div>

				{/* Image Upload */}
				<div
					{...getRootProps()}
					className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-all ${
						isDragActive
							? 'border-blue-500 bg-blue-100'
							: 'border-gray-300'
					}`}
				>
					<input {...getInputProps()} />
					<UploadCloud className='w-10 h-10 mx-auto text-gray-500' />
					<p className='text-gray-600'>
						{isDragActive
							? 'Drop the image here...'
							: 'Drag & drop an image here, or click to select'}
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
							alt='Country Image Preview'
							width={120}
							height={120}
							className='object-cover rounded-md'
						/>
					</div>
				)}

				{/* Upload Image Button */}
				<button
					type='button'
					onClick={handleImageUpload}
					disabled={imageUploading}
					className='w-full py-2 bg-blue-600 text-white rounded-md mt-2 disabled:opacity-50'
				>
					{imageUploading ? 'Uploading...' : 'Upload Image'}
				</button>

				{/* Visa Type & Mode - fixed values */}
				<div className='grid grid-cols-2 gap-4 mt-4'>
					<Input value={form.visaType} disabled label='Visa Type' />
					<Input value={form.visaMode} disabled label='Visa Mode' />
				</div>

				{/* Entry Types Section */}
				<div className='mt-6'>
					<h2 className='text-xl font-semibold mb-3'>Entry Types</h2>
					{form.entryTypes.map((entryType, index) => (
						<div
							key={entryType.entryType}
							className='border p-4 rounded-md mb-4 relative bg-gray-50'
						>
							{/* Remove Entry Type Button */}
							<button
								type='button'
								className='absolute top-2 right-2 text-red-600 hover:text-red-800'
								onClick={() => removeEntryType(index)}
								title='Remove Entry Type'
							>
								<Trash2 />
							</button>

							{/* Entry Type select disabled to avoid duplicates */}
							<div className='mb-3'>
								<label className='block mb-1 font-semibold'>
									Entry Type
								</label>
								<input
									type='text'
									value={entryType.entryType}
									disabled
									className='w-full border rounded px-2 py-1 bg-gray-200 cursor-not-allowed'
								/>
							</div>

							{/* Processing Time */}
							<Input
								placeholder='Processing Time'
								value={entryType.processingTime}
								onChange={e =>
									updateEntryType(
										index,
										'processingTime',
										e.target.value
									)
								}
								required
							/>

							{/* Visa Validity */}
							<Input
								placeholder='Visa Validity'
								value={entryType.visaValidity}
								onChange={e =>
									updateEntryType(
										index,
										'visaValidity',
										e.target.value
									)
								}
								required
							/>

							{/* Max Stay */}
							<Input
								placeholder='Max Stay'
								value={entryType.maxStay}
								onChange={e =>
									updateEntryType(
										index,
										'maxStay',
										e.target.value
									)
								}
								required
							/>

							{/* Description */}
							<div className='mt-3'>
								<label className='block mb-1 font-semibold'>
									Description
								</label>
								<textarea
									value={entryType.description || ''}
									onChange={e =>
										updateEntryType(
											index,
											'description',
											e.target.value
										)
									}
									className='w-full border rounded px-2 py-1 min-h-[80px]'
									placeholder='Short description'
								/>
							</div>

							{/* Content (JoditEditor) */}
							<div className='mt-3'>
								<label className='block mb-1 font-semibold'>
									Content
								</label>
								<JoditEditor
									value={entryType.content || ''}
									config={joditConfig}
									onBlur={newContent =>
										updateEntryType(
											index,
											'content',
											newContent
										)
									}
								/>
							</div>
						</div>
					))}

					{/* Add new entry type button */}
					<Button
						type='button'
						onClick={addEntryType}
						disabled={form.entryTypes.length >= 3}
						className='w-full'
					>
						<Plus className='inline mr-2' />
						Add Entry Type
					</Button>
				</div>

				{/* Submit Button */}
				<Button type='submit' className='w-full py-3 mt-6'>
					{editingId ? 'Update Visa' : 'Create Visa'}
				</Button>
			</form>

			{/* Existing Visas Table */}
			<div className='pt-6'>
				<h2 className='text-xl font-semibold mb-3'>Existing Visas</h2>
				<table className='w-full border text-left text-sm'>
					<thead className='bg-gray-100'>
						<tr>
							<th className='p-2'>Country</th>
							<th className='p-2'>Code</th>
							<th className='p-2'>Entry Types</th>
							<th className='p-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{visas.map(visa => (
							<tr key={visa._id} className='border-t'>
								<td className='p-2'>{visa.country}</td>
								<td className='p-2'>{visa.countryCode}</td>
								<td className='p-2'>
									{visa.entryTypes
										.map(et => et.entryType)
										.join(', ')}
								</td>
								<td className='p-2 flex gap-2'>
									<Button
										size='sm'
										variant='outline'
										onClick={() => handleEdit(visa)}
										title='Edit'
									>
										<Edit size={16} />
									</Button>
									<Button
										size='sm'
										variant='danger'
										onClick={() =>
											visa._id && handleDelete(visa._id)
										}
										title='Delete'
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
