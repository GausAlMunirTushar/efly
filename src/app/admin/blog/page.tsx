'use client'

import { useEffect, useState } from 'react'
import { Loader2, Trash2, Pencil } from 'lucide-react'
import Button from '@/components/form/Button'
import Title from '@/components/common/Title'
import Link from 'next/link'
import { Plus } from 'lucide-react'
interface Blog {
	_id: string
	title: string
	slug: string
	content: string
	category: { _id: string; name: string; slug: string }
	tags: string[]
	imageUrl: string
	createdAt: string
	updatedAt: string
}

const BlogPage = () => {
	const [blogs, setBlogs] = useState<Blog[]>([])
	const [loading, setLoading] = useState(true)

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

	useEffect(() => {
		fetchBlogs()
	}, [])

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

	return (
		<section className='bg-white p-4 rounded-lg'>
			<div className='flex justify-between items-center'>
				<Title>Blogs</Title>
				<Link href={`/admin/blog/create`}>
					<Button size='md'>
						<Plus className='w-4 h-4 mr-1' /> Create New Blog
					</Button>
				</Link>
			</div>
			<div className='mt-4'>
				{/* Show Loader While Fetching */}
				{loading ? (
					<div className='flex justify-center'>
						<Loader2 className='animate-spin text-gray-500' />
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-2'>
						{blogs.length === 0 ? (
							<div className='flex justify-center flex-col items-center'>
								<p className='text-center text-gray-500 mb-4'>
									No blogs found.
								</p>
							</div>
						) : (
							blogs.map(blog => (
								<div
									key={blog.slug}
									className='bg-white rounded-lg shadow-md border border-gray-200'
								>
									{/* Use Image component for optimized image rendering */}
									<div className='relative w-full h-36'>
										<img
											src={
												blog.imageUrl ||
												'/placeholder.jpg'
											} // Fallback image
											alt={blog.title || 'Blog Image'}
											width={500}
											height={144}
											className='object-cover h-36 w-full rounded-t-lg'
										/>
									</div>
									<div className='p-2'>
										<h3 className='text-2xl font-semibold truncate'>
											{blog.title}
										</h3>
										<p className='text-sm text-gray-600'>
											{blog.category.name}
										</p>
										<p className='mt-2 text-gray-800 line-clamp-3'>
											{blog.content}
										</p>
										<div className='mt-4 flex gap-4'>
											<Link
												href={`/admin/blog/create?slug=${blog.slug}`}
											>
												<Button size='sm'>
													<Pencil className='w-4 h-4 mr-1' />{' '}
													Edit
												</Button>
											</Link>
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

export default BlogPage
