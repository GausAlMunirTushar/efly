'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Edit, Trash2 } from 'lucide-react'
import {
	Country,
	createCountry,
	updateCountry,
	deleteCountry,
	getCountries
} from '@/services/countryService'
import Modal from '@/components/common/Modal'
import Input from '@/components/form/Input'
import ImageUploader from '@/components/common/ImageUploader'
import Button from '@/components/form/Button'
import Title from '@/components/common/Title'
import Image from 'next/image'

const CountryPage = () => {
	const [countries, setCountries] = useState<Country[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [form, setForm] = useState<Partial<Country>>({
		name: '',
		countryCode: '',
		image: ''
	})
	const [editingId, setEditingId] = useState<string | null>(null)

	useEffect(() => {
		fetchCountries()
	}, [])

	const fetchCountries = async () => {
		const data = await getCountries()
		setCountries(data)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleImageUpload = (imageUrl: string) => {
		setForm(prev => ({ ...prev, image: imageUrl }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!form.name || !form.countryCode || !form.image) return // Validation

		if (editingId) {
			await updateCountry(editingId, form)
		} else {
			await createCountry(form)
		}

		resetForm()
		await fetchCountries()
		setIsModalOpen(false)
	}

	const handleEdit = (country: Country) => {
		setForm({
			name: country.name,
			countryCode: country.countryCode,
			image: country.image
		})
		setEditingId(country._id)
		setIsModalOpen(true)
	}

	const handleDelete = async (id: string) => {
		if (confirm('Are you sure you want to delete?')) {
			await deleteCountry(id)
			await fetchCountries()
		}
	}

	const resetForm = () => {
		setForm({ name: '', countryCode: '', image: '' })
		setEditingId(null)
	}

	return (
		<div className='bg-white min-h-screen p-6 rounded-lg'>
			<div className='flex items-center justify-between mb-4'>
				<Title>Country</Title>
				<Button size='sm' onClick={() => setIsModalOpen(true)}>
					Add Country
				</Button>
			</div>

			{/* Modal for Add/Edit Country */}
			<Modal
				isOpen={isModalOpen}
				size='xl'
				onClose={() => setIsModalOpen(false)}
				title={editingId ? 'Edit Country' : 'Add Country'}
			>
				<form onSubmit={handleSubmit} className='space-y-4 p-4'>
					<Input
						label='Country Name'
						name='name'
						value={form.name}
						onChange={handleInputChange}
						required
					/>
					<Input
						label='Country Code'
						name='countryCode'
						value={form.countryCode}
						onChange={handleInputChange}
						required
					/>
					<ImageUploader onImageUpload={handleImageUpload} />
					<div className='flex justify-end'>
						<Button size='sm' type='submit'>
							{editingId ? 'Update' : 'Add'} Country
						</Button>
					</div>
				</form>
			</Modal>

			{/* Country List */}
			<div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
				{countries.map(country => (
					<div
						key={country._id}
						className='bg-white rounded-md shadow'
					>
						<div className=''>
							<div>
								{country.image && (
									<Image
										src={country.image}
										alt={country.name}
										width={1980}
										height={1080}
										layout='intrinsic'
										quality={100}
										className='w-full h-40 object-cover rounded-t-md'
									/>
								)}
							</div>
							<div className='p-4'>
								<p className='font-semibold'>{country.name}</p>
								<p className='text-gray-500'>
									{country.countryCode}
								</p>
								<div className='flex items-center justify-end gap-4'>
									<Button
										variant='outline'
										size='sm'
										onClick={() => handleEdit(country)}
									>
										<Edit className='w-5 h-5' />
									</Button>
									<Button
										variant='danger'
										size='sm'
										onClick={() =>
											handleDelete(country._id!)
										}
									>
										<Trash2 className='w-5 h-5' />
									</Button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CountryPage
