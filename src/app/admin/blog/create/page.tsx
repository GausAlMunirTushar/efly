'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import SelectInput from '@/components/form/SelectInput'
import Title from '@/components/common/Title'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { TextStyle } from '@tiptap/extension-text-style'
import { Heading } from '@tiptap/extension-heading' // Corrected import
import { ListItem } from '@tiptap/extension-list' // Corrected import

interface Category {
	_id: string
	name: string
}

export default function CreateBlog() {
	const [form, setForm] = useState({
		title: '',
		content: '',
		category: '',
		tags: '',
		imageUrl: ''
	})
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState(false)
	const [imageUploading, setImageUploading] = useState(false)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
	const [slug, setSlug] = useState<string | null>(null)
	const router = useRouter()

	// Initialize Tiptap editor
	const editor = useEditor({
		extensions: [StarterKit, Bold, Italic, Heading, TextStyle, ListItem],
		content: form.content,
		onUpdate({ editor }) {
			if (editor) {
				setForm(prevForm => ({
					...prevForm,
					content: editor.getHTML()
				}))
			}
		}
	})

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search)
		const slugFromUrl = queryParams.get('slug')
		if (slugFromUrl) {
			setSlug(slugFromUrl)
			// Fetch existing blog data if editing
			fetchBlog(slugFromUrl)
		}
	}, [])

	useEffect(() => {
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
	}, [])

	const fetchBlog = async (slug: string) => {
		const res = await fetch(`/api/blog/${slug}`)
		const blog = await res.json()
		setForm({
			title: blog.title,
			content: blog.content,
			category: blog.category._id,
			tags: blog.tags.join(', '),
			imageUrl: blog.imageUrl || ''
		})
		setImagePreview(blog.imageUrl || null)
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
	) => {
		if (typeof e === 'string') {
			// For SelectInput component
			setForm(prevForm => ({
				...prevForm,
				category: e
			}))
		} else {
			// For other inputs (text, textarea)
			setForm(prevForm => ({
				...prevForm,
				[e.target.name]: e.target.value
			}))
		}
	}

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Validate form
		if (!form.title || !form.content || !form.category || !form.imageUrl) {
			toast.error('All fields are required.')
			return
		}

		setLoading(true)

		const method = slug ? 'PUT' : 'POST'
		const url = slug ? `/api/blog/${slug}` : '/api/blog'

		try {
			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...form, tags: form.tags.split(', ') })
			})

			if (res.ok) {
				toast.success('Blog saved successfully!')
				router.push('/admin/blogs') // Redirect to blogs page
			} else {
				toast.error('Error saving blog.')
			}
		} catch (error) {
			toast.error('Error saving blog.')
		} finally {
			setLoading(false)
		}
	}

	const categoryOptions = categories.map(category => ({
		value: category._id,
		label: category.name
	}))

	return (
		<section className='bg-white p-4 rounded-lg shadow-md border border-gray-200'>
			<div className='flex items-center justify-between'>
				<Title>{slug ? 'Edit Blog' : 'Create Blog'}</Title>
				<Link href={`/admin/blog`}>
					<Button size='md'>
						<ArrowLeft className='w-4 h-4 mr-1' />
					</Button>
				</Link>
			</div>
			<form onSubmit={handleSubmit} className='space-y-4 mt-4'>
				<Input
					name='title'
					placeholder='Title'
					value={form.title}
					onChange={handleInputChange}
				/>

				{/* Tiptap Editor */}
				<div className='border-b border-gray-200'>
					{/* Toolbar with icons */}
					<div className='flex space-x-4 mb-4'>
						<button
							type='button'
							onClick={() =>
								editor &&
								editor.chain().focus().toggleBold().run()
							}
							className={`text-xl bg-gray-200 px-4 py-2 rounded-lg ${editor?.isActive('bold') ? 'text-black' : 'text-gray-500'}`}
						>
							B
						</button>
						<button
							type='button'
							onClick={() =>
								editor &&
								editor.chain().focus().toggleItalic().run()
							}
							className={`text-xl bg-gray-200 px-4 py-2 rounded-lg ${editor?.isActive('italic') ? 'text-black' : 'text-gray-500'}`}
						>
							I
						</button>
						<button
							type='button'
							onClick={() =>
								editor &&
								editor.chain().focus().toggleUnderline().run()
							}
							className={`text-xl bg-gray-200 px-4 py-2 rounded-lg ${editor?.isActive('underline') ? 'text-black' : 'text-gray-500'}`}
						>
							<u>U</u> {/* Correct usage of the <u> tag */}
						</button>
					</div>

					{/* Editor Content */}
					<EditorContent
						editor={editor}
						className='min-h-[200px] w-full border rounded-lg p-6 text-lg leading-relaxed overflow-auto transition-all focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<SelectInput
					label='Category'
					options={categoryOptions}
					value={form.category}
					onChange={value => handleInputChange(value)} // Pass only the value string
				/>

				<Input
					name='tags'
					placeholder='Tags (comma-separated)'
					value={form.tags}
					onChange={handleInputChange}
				/>
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
				<Button type='submit' disabled={loading}>
					{loading ? (
						<Loader2 className='animate-spin w-4 h-4 mr-2' />
					) : null}
					{slug ? 'Update Blog' : 'Create Blog'}
				</Button>
			</form>
		</section>
	)
}
