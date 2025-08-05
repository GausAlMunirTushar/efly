'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import Button from '@/components/form/Button'
import Modal from '@/components/common/Modal'
import Title from '@/components/common/Title'
import { Edit, Trash2 } from 'lucide-react'

interface Slide {
	_id: string
	image: string
	link: string
}

const HomeSlide = () => {
	const [slides, setSlides] = useState<Slide[]>([])
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const [link, setLink] = useState('')
	const [editingId, setEditingId] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [fetching, setFetching] = useState(true)
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		fetchSlides()
	}, [])

	const fetchSlides = async () => {
		setFetching(true)
		try {
			const res = await fetch('/api/homeslides')
			const data = await res.json()
			setSlides(data)
		} catch (error) {
			toast.error('Failed to fetch slides')
		}
		setFetching(false)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		let imageUrl = preview
		try {
			if (file) {
				const formData = new FormData()
				formData.append('file', file)
				const uploadRes = await fetch('/api/upload', {
					method: 'POST',
					body: formData
				})
				const uploadData = await uploadRes.json()
				if (!uploadRes.ok) throw new Error('Image upload failed')
				imageUrl = uploadData.imageUrl
			}

			const payload = { image: imageUrl, link }
			const method = editingId ? 'PUT' : 'POST'
			const url = editingId
				? `/api/homeslides/${editingId}`
				: '/api/homeslides'

			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			})

			if (!res.ok) throw new Error('Failed to save slide')
			fetchSlides()
			resetForm()
			setIsModalOpen(false)
			toast.success(editingId ? 'Slide updated!' : 'Slide added!')
		} catch (error: any) {
			toast.error(error.message)
		}
		setLoading(false)
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			setFile(selectedFile)
			setPreview(URL.createObjectURL(selectedFile))
		}
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this slide?')) return
		setLoading(true)
		try {
			await fetch(`/api/homeslides/${id}`, { method: 'DELETE' })
			setSlides(prevSlides =>
				prevSlides.filter(slide => slide._id !== id)
			)
			toast.success('Slide deleted successfully')
		} catch {
			toast.error('Failed to delete slide')
		}
		setLoading(false)
	}

	const handleEdit = (slide: Slide) => {
		setPreview(slide.image)
		setLink(slide.link)
		setEditingId(slide._id)
		setIsModalOpen(true)
	}

	const resetForm = () => {
		setFile(null)
		setPreview(null)
		setLink('')
		setEditingId(null)
	}

	// Enable submit button only if the file is selected or there is a preview
	const isSubmitDisabled = !link || (file && !preview) || loading

	return (
		<section className='mx-auto p-4 bg-white min-h-screen box-shadow rounded-lg'>
			<div className='flex justify-between items-center'>
				<Title>Home Slide</Title>

				<Button
					variant='primary'
					size='md'
					onClick={() => setIsModalOpen(true)}
				>
					Create Slide
				</Button>
			</div>

			<Modal
				size='xl'
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={editingId ? 'Edit Slide' : 'Create Slide'}
			>
				<form onSubmit={handleSubmit} className='space-y-4 p-4'>
					<input
						type='text'
						placeholder='Slide Link'
						value={link}
						onChange={e => setLink(e.target.value)}
						className='p-2 border rounded w-full'
						required
					/>
					<input
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						className='p-2 border rounded w-full'
					/>
					{preview && (
						<Image
							src={preview}
							alt='Preview'
							width={200}
							height={100}
							className='rounded-md shadow'
						/>
					)}
					<Button
						type='submit'
						variant='primary'
						size='md'
						isLoading={loading}
						disabled={isSubmitDisabled}
					>
						{editingId ? 'Update Slide' : 'Upload Slide'}
					</Button>
				</form>
			</Modal>

			{fetching && <p className='text-center mt-4'>Loading slides...</p>}

			<div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6'>
				{slides.map(slide => (
					<div
						key={slide._id}
						className='border rounded-md shadow-md overflow-hidden'
					>
						<img
							src={slide.image}
							alt='Slide'
							className='object-cover w-full h-40'
						/>
						<div className='p-4'>
							<Link
								href={slide.link}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-500 underline block'
							>
								Slide Link
							</Link>
							<div className='flex justify-between mt-4'>
								<Button
									variant='primary'
									onClick={() => handleEdit(slide)}
								>
									<Edit size={16} className='mr-2' />
									Edit
								</Button>
								<Button
									variant='danger'
									onClick={() => handleDelete(slide._id)}
								>
									<Trash2 size={16} className='mr-2' /> Delete
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default HomeSlide
