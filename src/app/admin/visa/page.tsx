'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Plus, Trash2, Edit, UploadCloud } from 'lucide-react'
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

// This is your frontend Country type (mapped from backend response)
type Country = {
	name: string
	code: string
	flag: string
}

export default function AdminVisaPage() {
	const [visas, setVisas] = useState<Visa[]>([])
	const [countries, setCountries] = useState<Country[]>([])

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

	const fetchAllData = useCallback(async () => {
		try {
			const [visaData, countryData] = await Promise.all([
				getVisas(),
				getCountries()
			])

			// Mapping backend country to frontend country
			const mappedCountries = countryData.map(c => ({
				name: c.name,
				code: c.countryCode,
				flag: c.image || ''
			}))

			setVisas(visaData)
			setCountries(mappedCountries)
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

	const addEntryType = () => {
		const allTypes: EntryTypeOption[] = [
			'Single Entry',
			'Double Entry',
			'Multiple Entry'
		]
		const remaining = allTypes.filter(
			t => !form.entryTypes.find(e => e.entryType === t)
		)
		if (!remaining.length) {
			toast.info('All entry types added.')
			return
		}
		const newEntry: VisaEntryType = {
			entryType: remaining[0],
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

	const removeEntryType = (index: number) => {
		setForm(prev => ({
			...prev,
			entryTypes: prev.entryTypes.filter((_, i) => i !== index)
		}))
	}

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!form.country || !form.countryCode || !form.countryImage) {
			toast.error('Country, Code and Image required.')
			return
		}

		if (!form.entryTypes.length) {
			toast.error('At least one entry type needed.')
			return
		}

		for (const et of form.entryTypes) {
			if (!et.processingTime || !et.visaValidity || !et.maxStay) {
				toast.error(`Fill all fields for ${et.entryType}`)
				return
			}
		}

		try {
			if (editingId) {
				await updateVisa(editingId, form)
				toast.success('Visa updated.')
			} else {
				await createVisa(form)
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
			entryTypes: []
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

	const handleEdit = (visa: Visa) => {
		setEditingId(visa._id || null)
		setForm({
			country: visa.country,
			countryCode: visa.countryCode,
			countryImage: visa.countryImage,
			visaType: visa.visaType,
			visaMode: visa.visaMode,
			entryTypes: visa.entryTypes
		})
		setImagePreview(visa.countryImage)
	}

	const joditConfig = useMemo(
		() => ({ readonly: false, placeholder: 'Start typing...' }),
		[]
	)

	return (
		<div className='bg-white p-6 rounded-lg max-w-5xl mx-auto'>
			<h1 className='text-2xl font-bold mb-6'>Visa Management</h1>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label className='block mb-1 font-semibold'>
							Country
						</label>
						<select
							className='w-full border rounded px-2 py-1'
							value={form.country}
							onChange={e => {
								const selected = countries.find(
									c => c.name === e.target.value
								)
								setForm(prev => ({
									...prev,
									country: selected?.name || '',
									countryCode: selected?.code || '',
									countryImage: selected?.flag || ''
								}))
								setImagePreview(selected?.flag || null)
							}}
						>
							<option value=''>Select Country</option>
							{countries.map(c => (
								<option key={c.code} value={c.name}>
									{c.name}
								</option>
							))}
						</select>
					</div>

					<Input
						placeholder='Country Code'
						value={form.countryCode}
						disabled
					/>
				</div>

				{imagePreview && (
					<div className='mt-2'>
						<Image
							src={imagePreview}
							alt='Country'
							width={120}
							height={120}
							className='rounded-md'
						/>
					</div>
				)}

				<div
					{...getRootProps()}
					className='border-2 border-dashed p-4 rounded text-center cursor-pointer'
				>
					<input {...getInputProps()} />
					<UploadCloud className='w-10 h-10 mx-auto text-gray-500' />
					<p>
						{isDragActive
							? 'Drop the image...'
							: 'Drag & drop image or click'}
					</p>
				</div>

				<Button
					type='button'
					onClick={handleImageUpload}
					disabled={imageUploading}
					className='w-full mt-2'
				>
					{imageUploading ? 'Uploading...' : 'Upload Image'}
				</Button>

				<div>
					<h2 className='text-xl font-semibold my-4'>Entry Types</h2>
					{form.entryTypes.map((entry, index) => (
						<div
							key={index}
							className='border p-4 rounded mb-4 bg-gray-50 relative'
						>
							<button
								type='button'
								onClick={() => removeEntryType(index)}
								className='absolute top-2 right-2 text-red-600'
							>
								<Trash2 />
							</button>

							<Input
								placeholder='Entry Type'
								value={entry.entryType}
								disabled
							/>
							<Input
								placeholder='Processing Time'
								value={entry.processingTime}
								onChange={e =>
									updateEntryType(
										index,
										'processingTime',
										e.target.value
									)
								}
							/>
							<Input
								placeholder='Visa Validity'
								value={entry.visaValidity}
								onChange={e =>
									updateEntryType(
										index,
										'visaValidity',
										e.target.value
									)
								}
							/>
							<Input
								placeholder='Max Stay'
								value={entry.maxStay}
								onChange={e =>
									updateEntryType(
										index,
										'maxStay',
										e.target.value
									)
								}
							/>

							<textarea
								placeholder='Description'
								value={entry.description || ''}
								onChange={e =>
									updateEntryType(
										index,
										'description',
										e.target.value
									)
								}
								className='w-full border rounded px-2 py-1 mt-2'
							/>

							<JoditEditor
								value={entry.content || ''}
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
					))}

					<Button
						type='button'
						onClick={addEntryType}
						disabled={form.entryTypes.length >= 3}
						className='w-full'
					>
						<Plus className='mr-2' /> Add Entry Type
					</Button>
				</div>

				<Button type='submit' className='w-full py-3'>
					{editingId ? 'Update Visa' : 'Create Visa'}
				</Button>
			</form>

			<div className='mt-10'>
				<h2 className='text-xl font-semibold mb-3'>Existing Visas</h2>
				<table className='w-full border text-sm'>
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
										.map(e => e.entryType)
										.join(', ')}
								</td>
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
										onClick={() =>
											visa._id && handleDelete(visa._id)
										}
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
