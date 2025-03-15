'use client'

import { useState, useEffect } from 'react'
import { Loader2, Trash, Edit } from 'lucide-react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { toast } from 'react-toastify'

export default function CategoriesPage() {
	const [categories, setCategories] = useState<
		{ _id: string; name: string }[]
	>([])
	const [categoryName, setCategoryName] = useState('')
	const [editingCategory, setEditingCategory] = useState<{
		_id: string
		name: string
	} | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchCategories()
	}, [])

	const fetchCategories = async () => {
		try {
			const res = await fetch('/api/categories')
			const data = await res.json()
			setCategories(data)
		} catch (error) {
			console.error('Error fetching categories:', error)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		const method = editingCategory ? 'PUT' : 'POST'
		const url = editingCategory
			? `/api/categories/${editingCategory._id}`
			: '/api/categories'

		try {
			await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: categoryName })
			})
			setCategoryName('')
			setEditingCategory(null)
			fetchCategories()
		} catch (error) {
			console.error('Error saving category:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleEdit = (category: { _id: string; name: string }) => {
		setEditingCategory(category)
		setCategoryName(category.name)
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this category?')) return
		setLoading(true)
		try {
			await fetch(`/api/categories/${id}`, { method: 'DELETE' })
			fetchCategories()
		} catch (error) {
			console.error('Error deleting category:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
			<h2 className='text-xl font-semibold mb-4'>Manage Categories</h2>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<Input
					type='text'
					name='category'
					placeholder='Category Name'
					value={categoryName}
					onChange={e => setCategoryName(e.target.value)}
					required
				/>
				<Button type='submit' disabled={loading}>
					{loading ? (
						<Loader2 className='animate-spin w-4 h-4 mr-2' />
					) : null}
					{editingCategory ? 'Update Category' : 'Add Category'}
				</Button>
			</form>

			<ul className='mt-6 space-y-2'>
				{categories.map(category => (
					<li
						key={category._id}
						className='flex justify-between items-center p-2 bg-gray-100 rounded-md'
					>
						<span>{category.name}</span>
						<div className='flex gap-2'>
							<Button
								variant='secondary'
								onClick={() => handleEdit(category)}
							>
								<Edit className='w-4 h-4' />
							</Button>
							<Button
								variant='danger'
								onClick={() => handleDelete(category._id)}
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
