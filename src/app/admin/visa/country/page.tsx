'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import {
	getCountries,
	createCountry,
	updateCountry,
	deleteCountry,
	uploadImage,
	Country
} from '@/services/countryService'

const AdminCountryPage = () => {
	const [countries, setCountries] = useState<Country[]>([])
	const [form, setForm] = useState<Partial<Country>>({
		name: '',
		countryCode: '',
		image: ''
	})
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const [editingId, setEditingId] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchCountries()
	}, [])

	const fetchCountries = async () => {
		try {
			setLoading(true)
			const data = await getCountries()
			setCountries(data)
		} catch (err) {
			setError('Failed to fetch countries.')
		} finally {
			setLoading(false)
		}
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			setSelectedFile(file)
			setPreview(URL.createObjectURL(file))
		}
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			let imageUrl = form.image

			if (selectedFile) {
				imageUrl = await uploadImage(selectedFile)
			}

			const countryData = { ...form, image: imageUrl }

			if (editingId) {
				await updateCountry(editingId, countryData)
			} else {
				await createCountry(countryData)
			}

			resetForm()
			await fetchCountries()
		} catch (err: any) {
			setError(err?.message || 'Something went wrong.')
		} finally {
			setLoading(false)
		}
	}

	const handleEdit = (country: Country) => {
		setForm({
			name: country.name,
			countryCode: country.countryCode,
			image: country.image
		})
		setEditingId(country._id || null)
		setPreview(country.image || null)
		setSelectedFile(null)
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete?')) return
		setLoading(true)
		try {
			await deleteCountry(id)
			await fetchCountries()
		} catch (err: any) {
			setError(err?.message || 'Failed to delete.')
		} finally {
			setLoading(false)
		}
	}

	const resetForm = () => {
		setForm({ name: '', countryCode: '', image: '' })
		setSelectedFile(null)
		setPreview(null)
		setEditingId(null)
	}

	return (
		<div className='p-4 bg-white rounded-lg'>
			<h1 className='text-2xl font-bold mb-4'>Country Management</h1>

			{error && <div className='text-red-500 mb-2'>{error}</div>}

			<form onSubmit={handleSubmit} className='mb-4 space-y-2'>
				<input
					type='text'
					name='name'
					value={form.name}
					onChange={handleInputChange}
					placeholder='Country Name'
					className='border p-2 w-full'
					required
					disabled={loading}
				/>
				<input
					type='text'
					name='countryCode'
					value={form.countryCode}
					onChange={handleInputChange}
					placeholder='Country Code (e.g. US)'
					className='border p-2 w-full'
					required
					disabled={loading}
				/>
				<input
					type='file'
					onChange={handleFileChange}
					className='w-full'
					disabled={loading}
				/>
				{preview && (
					<img
						src={preview}
						alt='Preview'
						className='w-20 h-20 object-cover mt-2 rounded'
					/>
				)}
				<button
					type='submit'
					className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
					disabled={loading}
				>
					{loading
						? 'Processing...'
						: editingId
							? 'Update'
							: 'Create'}
				</button>
				{editingId && (
					<button
						type='button'
						className='ml-2 bg-gray-500 text-white px-4 py-2 rounded'
						onClick={resetForm}
						disabled={loading}
					>
						Cancel
					</button>
				)}
			</form>

			<div>
				<h2 className='text-xl mb-2'>Countries</h2>
				{loading && countries.length === 0 ? (
					<div>Loading...</div>
				) : (
					<ul>
						{countries.map(country => (
							<li
								key={country._id}
								className='flex items-center justify-between mb-2 border p-2 rounded'
							>
								<div className='flex items-center'>
									{country.image && (
										<img
											src={country.image}
											alt={country.name}
											className='w-10 h-10 inline-block mr-2 rounded'
										/>
									)}
									<div>
										<div className='font-semibold'>
											{country.name}
										</div>
										<div className='text-sm text-gray-500'>
											({country.countryCode})
										</div>
									</div>
								</div>
								<div>
									<button
										className='mr-2 bg-yellow-500 text-white px-2 py-1 rounded'
										onClick={() => handleEdit(country)}
										disabled={loading}
									>
										Edit
									</button>
									<button
										className='bg-red-500 text-white px-2 py-1 rounded'
										onClick={() =>
											handleDelete(country._id!)
										}
										disabled={loading}
									>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default AdminCountryPage
