'use client'

import { useEffect, useState } from 'react'
import { Loader2, Trash2, Pencil } from 'lucide-react'
import dynamic from 'next/dynamic'
import Button from '@/components/form/Button'
import Title from '@/components/common/Title'
import Image from 'next/image'

interface Blog {
	_id: string
	title: string
	slug: string
	content: string
	category: {
		_id: string
		name: string
		slug: string
	}
	tags: string[]
	imageUrl: string
	createdAt: string
	updatedAt: string
}

// Dynamically import BlogForm to disable SSR
const BlogForm = dynamic(
	() => import('@/components/pages/dashboard/blog/BlogForm'),
	{
		ssr: false
	}
)

const BlogAdminPage = () => {
	const [blogs, setBlogs] = useState<Blog[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

	// Fetch blogs from API
	const fetchBlogs = async () => {
		setLoading(true)
		try {
			const res = await fetch('/api/blog')
			if (!res.ok) throw new Error('Failed to fetch blogs')
			const data: Blog[] = await res.json()
			setBlogs(data)
		} catch (error) {
			console.error('Error fetching blogs:', error)
			setBlogs([]) // Set blogs to an empty array in case of error
		} finally {
			setLoading(false)
		}
	}

	// Handle Delete
	const handleDelete = async (slug: string) => {
		if (!confirm('Are you sure you want to delete this blog?')) return

		try {
			await fetch(`/api/blog/${slug}`, { method: 'DELETE' })
			fetchBlogs()
		} catch (error) {
			console.error('Error deleting blog:', error)
		}
	}

	// Fetch blogs on component mount
	useEffect(() => {
		fetchBlogs()
	}, [])

	return (
		<section>
			<Title>Manage Blogs</Title>

			{/* Blog Form (Create / Edit) */}
			<BlogForm
				onBlogUpdated={fetchBlogs}
				selectedBlog={selectedBlog}
				setSelectedBlog={setSelectedBlog}
			/>

			{/* Blog List */}
			<div className='mt-8'>
				<h2 className='text-xl font-semibold mb-2'>All Blogs</h2>

				{/* Show Loader While Fetching */}
				{loading ? (
					<div className='flex justify-center'>
						<Loader2 className='animate-spin text-gray-500' />
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-2'>
						{blogs.length === 0 ? (
							<p className='text-center text-gray-500 col-span-full'>
								No blogs found.
							</p>
						) : (
							blogs.map(blog => (
								<div
									key={blog.slug}
									className='bg-white rounded-lg shadow-md border border-gray-200'
								>
									{/* Ensure Image Uses a Valid URL */}
									<div className='relative w-full h-36'>
										<img
											src={
												blog.imageUrl ||
												'/placeholder.jpg'
											} // Fallback image
											alt={blog.title || 'Blog Image'} // Fallback alt text
											className='object-cover h-36 w-full rounded-t-lg'
										/>
									</div>
									<div className='p-2'>
										<h3 className='text-2xl font-semibold'>
											{blog.title}
										</h3>
										<p className='text-sm text-gray-600'>
											{blog.category.name}
										</p>
										<p className='mt-2 text-gray-800 line-clamp-3'>
											{blog.content}
										</p>
										<div className='mt-4 flex gap-2'>
											<Button
												size='sm'
												onClick={() =>
													setSelectedBlog(blog)
												}
											>
												<Pencil className='w-4 h-4 mr-1' />{' '}
												Edit
											</Button>
											<Button
												size='sm'
												variant='danger'
												onClick={() =>
													handleDelete(blog.slug)
												}
											>
												<Trash2 className='w-4 h-4 mr-1' />{' '}
												Delete
											</Button>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				)}
			</div>
		</section>
	)
}

export default BlogAdminPage
