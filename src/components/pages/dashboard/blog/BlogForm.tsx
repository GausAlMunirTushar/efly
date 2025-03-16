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
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [categories, setCategories] = useState<
		{ _id: string; name: string }[]
	>([])
	const [isMounted, setIsMounted] = useState(false)
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

	// Ensure it only runs on the client
	useEffect(() => {
		setIsMounted(true)
	}, [])

	// Fetch categories from API
	useEffect(() => {
		if (!isMounted) return

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

	// Reset form on selectedBlog change
	useEffect(() => {
		if (selectedBlog) {
			setForm({
				title: selectedBlog.title,
				content: selectedBlog.content,
				category: selectedBlog.category,
				tags: selectedBlog.tags.join(', '),
				imageUrl: selectedBlog.imageUrl || ''
			})
			setImagePreview(selectedBlog.imageUrl || null)
		} else {
			setForm({
				title: '',
				content: '',
				category: '',
				tags: '',
				imageUrl: ''
			})
			setImagePreview(null)
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

	// Handle image upload and preview
	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files ? e.target.files[0] : null
		if (!file) return

		// Show image preview before upload
		setImagePreview(URL.createObjectURL(file))

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

	// Validate the form before submission
	const validateForm = () => {
		const errors: { [key: string]: string } = {}
		if (!form.title) errors.title = 'Title is required'
		if (!form.content) errors.content = 'Content is required'
		else if (form.content.length < 20)
			errors.content = 'Content must be at least 20 characters long'
		if (!form.category) errors.category = 'Category is required'
		if (!form.imageUrl) errors.imageUrl = 'Image is required'
		if (!form.tags) errors.tags = 'Tags are required'

		setFormErrors(errors)
		return Object.keys(errors).length === 0
	}

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validateForm()) return

		setLoading(true)

		const method = selectedBlog ? 'PUT' : 'POST'
		const url = selectedBlog
			? `/api/blog/${selectedBlog.slug}`
			: '/api/blog'

		try {
			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...form, tags: form.tags.split(', ') })
			})

			if (!res.ok) {
				const errorData = await res.json()
				// Handle validation errors from the server
				if (errorData.errors) {
					setFormErrors(errorData.errors)
				} else {
					toast.error('Error submitting blog.')
				}
			} else {
				setForm({
					title: '',
					content: '',
					category: '',
					tags: '',
					imageUrl: ''
				})
				setImagePreview(null)
				setSelectedBlog(null)
				onBlogUpdated()
			}
		} catch (error) {
			console.error('Error submitting blog:', error)
			toast.error('Error submitting blog.')
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
		setImagePreview(null)
	}, [setSelectedBlog])

	// Only render the form if mounted (client-side)
	if (!isMounted) return null

	// Category options for select input
	const categoryOptions = categories.map(category => ({
		value: category._id,
		label: category.name
	}))

	// Only submit if the form is valid
	const isFormValid =
		form.title &&
		form.content &&
		form.category &&
		form.imageUrl &&
		!loading &&
		!Object.keys(formErrors).length

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
				{formErrors.title && (
					<p className='text-red-500 text-sm'>{formErrors.title}</p>
				)}
				<TextArea
					name='content'
					placeholder='Content'
					value={form.content}
					onChange={handleInputChange}
					required
				/>
				{formErrors.content && (
					<p className='text-red-500 text-sm'>{formErrors.content}</p>
				)}
				{categories.length > 0 && (
					<SelectInput
						label='Category'
						options={categoryOptions}
						value={form.category}
						onChange={(value: string) =>
							handleInputChange({
								target: {
									name: 'category',
									value: value
								}
							} as React.ChangeEvent<HTMLInputElement>)
						}
						placeholder='Select a category'
						required
					/>
				)}
				{formErrors.category && (
					<p className='text-red-500 text-sm'>
						{formErrors.category}
					</p>
				)}
				<Input
					name='tags'
					placeholder='Tags (comma-separated)'
					value={form.tags}
					onChange={handleInputChange}
					required
				/>
				{formErrors.tags && (
					<p className='text-red-500 text-sm'>{formErrors.tags}</p>
				)}
				{/* Image Upload Section */}
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
							<Loader2 className='animate-spin text-gray-500' />
						</div>
					)}
					{imagePreview && (
						<div className='mt-2'>
							<img
								src={imagePreview}
								alt='Image Preview'
								className='h-32 w-32 object-cover rounded-lg'
							/>
						</div>
					)}
				</div>
				<Button type='submit' disabled={!isFormValid}>
					{loading ? (
						<Loader2 className='animate-spin w-4 h-4 mr-2' />
					) : null}
					{selectedBlog ? 'Update Blog' : 'Create Blog'}
				</Button>
				{selectedBlog && (
					<Button
						type='button'
						variant='secondary'
						onClick={handleCancel}
					>
						Cancel
					</Button>
				)}
			</form>
		</div>
	)
}
