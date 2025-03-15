'use client'
import { useState, useEffect, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import TextArea from '@/components/form/TextArea'
import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import SelectInput from '@/components/form/SelectInput'
import { toast } from 'react-toastify'

export default function BlogForm({
	selectedBlog,
	setSelectedBlog,
	onBlogUpdated
}: {
	selectedBlog: any
	setSelectedBlog: (blog: any) => void
	onBlogUpdated: () => void
}) {
	const [form, setForm] = useState({
		title: '',
		content: '',
		category: '',
		tags: '',
		imageUrl: ''
	})
	const [loading, setLoading] = useState(false)
	const [imageUploading, setImageUploading] = useState(false)
	const [categories, setCategories] = useState<
		{ _id: string; name: string }[]
	>([])
	const [isMounted, setIsMounted] = useState(false)

	// Ensure it only runs on the client
	useEffect(() => {
		setIsMounted(true)
	}, [])

	// Fetch categories from API - Ensure this runs only on the client side after mounting
	useEffect(() => {
		if (!isMounted) return // Do not fetch categories if not mounted

		const fetchCategories = async () => {
			try {
				const res = await fetch('/api/categories')
				const data = await res.json()
				setCategories(data)
			} catch (error) {
				console.error('Error fetching categories:', error)
			}
		}
		fetchCategories()
	}, [isMounted])

	// Handle form state reset more efficiently
	useEffect(() => {
		if (selectedBlog) {
			setForm({
				title: selectedBlog.title,
				content: selectedBlog.content,
				category: selectedBlog.category,
				tags: selectedBlog.tags.join(', '),
				imageUrl: selectedBlog.imageUrl || ''
			})
		} else {
			setForm({
				title: '',
				content: '',
				category: '',
				tags: '',
				imageUrl: ''
			})
		}
	}, [selectedBlog])

	const handleInputChange = useCallback(
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			>
		) => {
			setForm(prevForm => ({
				...prevForm,
				[e.target.name]: e.target.value
			}))
		},
		[]
	)

	// Handle image upload
	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files ? e.target.files[0] : null
		if (!file) return

		setImageUploading(true)
		const formData = new FormData()
		formData.append('file', file)

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			})
			const data = await res.json()
			if (data.imageUrl) {
				setForm({ ...form, imageUrl: data.imageUrl })
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		const method = selectedBlog ? 'PUT' : 'POST'
		const url = selectedBlog
			? `/api/blog/${selectedBlog.slug}`
			: '/api/blog'

		try {
			await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...form, tags: form.tags.split(', ') })
			})
			setForm({
				title: '',
				content: '',
				category: '',
				tags: '',
				imageUrl: ''
			})
			setSelectedBlog(null)
			onBlogUpdated()
		} catch (error) {
			console.error('Error submitting blog:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleCancel = useCallback(() => {
		setSelectedBlog(null)
		setForm({
			title: '',
			content: '',
			category: '',
			tags: '',
			imageUrl: ''
		})
	}, [setSelectedBlog])

	// Only render the form if mounted (client-side)
	if (!isMounted) {
		return null
	}

	// Transform categories into SelectInput options
	const categoryOptions = categories.map(category => ({
		value: category._id, // Use _id as the value for category
		label: category.name
	}))

	return (
		<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
			<h2 className='text-xl font-semibold mb-4'>
				{selectedBlog ? 'Edit Blog' : 'Create Blog'}
			</h2>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<Input
					name='title'
					placeholder='Title'
					value={form.title}
					onChange={handleInputChange}
					required
				/>
				<TextArea
					name='content'
					placeholder='Content'
					value={form.content}
					onChange={handleInputChange}
					required
				/>
				{/* Category Dropdown using SelectInput */}
				{categories.length > 0 && (
					<SelectInput
						label='Category'
						options={categoryOptions}
						value={form.category}
						onChange={(value: string) => {
							handleInputChange({
								target: {
									name: 'category',
									value: value
								}
							} as React.ChangeEvent<HTMLInputElement>)
						}}
						placeholder='Select a category'
						required
					/>
				)}

				<Input
					name='tags'
					placeholder='Tags (comma-separated)'
					value={form.tags}
					onChange={handleInputChange}
					required
				/>

				{/* Image Upload */}
				<div className='mb-4'>
					<label className='block text-sm font-medium text-gray-700'>
						Upload Image
					</label>
					<input
						type='file'
						accept='image/*'
						onChange={handleImageUpload}
						className='mt-1 block text-sm text-gray-500'
					/>
					{imageUploading && (
						<div className='flex justify-center mt-2'>
							<Loader2 className='animate-spin w-6 h-6 text-gray-500' />
						</div>
					)}
					{form.imageUrl && (
						<img
							src={form.imageUrl}
							alt='Blog Image'
							className='mt-2 rounded-md max-w-md'
						/>
					)}
				</div>

				<div className='flex gap-2'>
					<Button type='submit' disabled={loading}>
						{loading ? (
							<Loader2 className='animate-spin w-4 h-4 mr-2' />
						) : null}
						{selectedBlog ? 'Update Blog' : 'Create Blog'}
					</Button>
					{selectedBlog && (
						<Button variant='secondary' onClick={handleCancel}>
							Cancel
						</Button>
					)}
				</div>
			</form>
		</div>
	)
}
