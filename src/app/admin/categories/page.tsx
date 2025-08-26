'use client'

import { useState, useEffect } from 'react'
import { Loader2, Trash, Edit } from 'lucide-react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Title from '@/components/common/Title'

interface Category {
	_id: string
	name: string
	slug: string
}

export default function CategoriesPage() {
	const [categories, setCategories] = useState<Category[]>([])
	const [categoryName, setCategoryName] = useState<string>('')
	const [editingCategory, setEditingCategory] = useState<Category | null>(
		null
	)
	const [loading, setLoading] = useState<boolean>(false)
	const [isFetching, setIsFetching] = useState<boolean>(true) // Separate fetch loading
	const [slugPreview, setSlugPreview] = useState<string>('')

	useEffect(() => {
		fetchCategories()
	}, [])

	// Generate slug preview as user types category name
	useEffect(() => {
		setSlugPreview(
			categoryName
				.trim()
				.toLowerCase()
				.replace(/\s+/g, '-') // Replace spaces with dashes
				.replace(/[^\w-]+/g, '') // Remove non-alphanumeric characters
				.replace(/-+/g, '-') // Remove multiple dashes
		)
	}, [categoryName])

	const fetchCategories = async (): Promise<void> => {
		setIsFetching(true)
		try {
			const res = await fetch('/api/categories')
			if (!res.ok) throw new Error('Failed to fetch categories')
			const data: Category[] = await res.json()
			setCategories(data)
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'An error occurred'
			)
		} finally {
			setIsFetching(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault()
		setLoading(true)

		const method = editingCategory ? 'PATCH' : 'POST'
		const url = editingCategory
			? `/api/categories/${editingCategory._id}`
			: '/api/categories'

		try {
			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: categoryName })
			})

			if (!res.ok) throw new Error('Failed to save category')

			setCategoryName('')
			setEditingCategory(null)
			toast.success(
				editingCategory
					? 'Category updated successfully!'
					: 'Category added successfully!'
			)
			fetchCategories()
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'An error occurred'
			)
		} finally {
			setLoading(false)
		}
	}

	const handleEdit = (category: Category): void => {
		setEditingCategory(category)
		setCategoryName(category.name)
		toast.info('Editing category: ' + category.name)
	}

	const handleDelete = async (id: string): Promise<void> => {
		if (!confirm('Are you sure you want to delete this category?')) return
		setLoading(true)
		try {
			const res = await fetch(`/api/categories/${id}`, {
				method: 'DELETE'
			})
			if (!res.ok) throw new Error('Failed to delete category')

			setCategories(categories.filter(category => category._id !== id))
			toast.success('Category deleted successfully!')
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'An error occurred'
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200 relative'>
			{isFetching && (
				<div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-80'>
					<Loader2 className='animate-spin w-8 h-8 text-gray-500' />
				</div>
			)}

			<Title>Blog Categories</Title>
			<form onSubmit={handleSubmit} className='space-y-4 mt-2'>
				<Input
					type='text'
					name='category'
					placeholder='Category Name'
					value={categoryName}
					onChange={e => setCategoryName(e.target.value)}
					required
					disabled={loading}
				/>
				{/* Show the generated slug preview */}
				<div className='text-sm text-gray-500'>
					<strong>Generated Slug:</strong> {slugPreview}
				</div>
				<Button type='submit' disabled={loading}>
					{loading && (
						<Loader2 className='animate-spin w-4 h-4 mr-2' />
					)}
					{editingCategory ? 'Update Category' : 'Add Category'}
				</Button>
			</form>

			<ul className='mt-6 space-y-2'>
				{categories.map(category => (
					<li
						key={category._id}
						className='flex justify-between items-center p-2 bg-gray-100 rounded-md'
					>
						<div className='flex flex-col'>
							<span>{category.name}</span>
							<small className='text-gray-500'>
								{category.slug}
							</small>{' '}
							{/* Display the slug */}
						</div>
						<div className='flex gap-2'>
							<Button
								variant='primary'
								onClick={() => handleEdit(category)}
								disabled={loading}
							>
								<Edit className='w-4 h-4' />
							</Button>
							<Button
								variant='danger'
								onClick={() => handleDelete(category._id)}
								disabled={loading}
							>
								<Trash className='w-4 h-4' />
							</Button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
