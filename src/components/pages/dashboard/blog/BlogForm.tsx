'use client'
import { useState } from 'react'

export default function BlogForm() {
	const [form, setForm] = useState({
		title: '',
		content: '',
		category: '',
		tags: ''
	})
	const [image, setImage] = useState<File | null>(null)
	const [imageUrl, setImageUrl] = useState('')

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleImageUpload = async () => {
		if (!image) return

		const formData = new FormData()
		formData.append('file', image)

		const res = await fetch('/api/upload', {
			method: 'POST',
			body: formData
		})
		const data = await res.json()

		if (data.imageUrl) setImageUrl(data.imageUrl)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const res = await fetch('/api/blog', {
			method: 'POST',
			body: JSON.stringify({
				...form,
				tags: form.tags.split(','),
				imageUrl
			}),
			headers: { 'Content-Type': 'application/json' }
		})

		const data = await res.json()
		console.log('Blog Created:', data)
	}

	return (
		<div className='p-6 bg-white rounded-lg shadow-md'>
			<input
				type='text'
				name='title'
				placeholder='Title'
				onChange={handleInputChange}
				className='border p-2 w-full mb-2'
			/>
			<textarea
				name='content'
				placeholder='Content'
				onChange={handleInputChange}
				className='border p-2 w-full mb-2'
			/>
			<input
				type='text'
				name='category'
				placeholder='Category'
				onChange={handleInputChange}
				className='border p-2 w-full mb-2'
			/>
			<input
				type='text'
				name='tags'
				placeholder='Tags (comma-separated)'
				onChange={handleInputChange}
				className='border p-2 w-full mb-2'
			/>

			<input
				type='file'
				accept='image/*'
				onChange={e => setImage(e.target.files?.[0] || null)}
				className='border p-2 w-full mb-2'
			/>
			<button
				onClick={handleImageUpload}
				className='bg-blue-500 text-white px-4 py-2 rounded'
			>
				Upload Image
			</button>

			{imageUrl && (
				<img
					src={imageUrl}
					alt='Uploaded'
					className='w-32 h-32 object-cover mt-2'
				/>
			)}

			<button
				onClick={handleSubmit}
				className='bg-green-500 text-white px-4 py-2 rounded mt-2'
			>
				Create Blog
			</button>
		</div>
	)
}
