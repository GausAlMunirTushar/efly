'use client'
import React, { useEffect, useState } from 'react'
import BlogForm from '@/components/pages/dashboard/blog/BlogForm'
import { Blog } from '@/types/Blog'
import Title from '@/components/common/Title'

const BlogAdminPage = () => {
	const [blogs, setBlogs] = useState<Blog[]>([])

	// Fetch Blogs
	const fetchBlogs = async () => {
		try {
			const res = await fetch('/api/blog')
			const data = await res.json()
			setBlogs(data)
		} catch (error) {
			console.error('Error fetching blogs:', error)
		}
	}

	useEffect(() => {
		fetchBlogs()
	}, [])

	return (
		<section className=''>
			<Title>Manage Blogs</Title>
			<div className='mt-6'>
				<BlogForm onBlogCreated={fetchBlogs} />
			</div>

			{/* Display Blog List */}
			<div className='mt-6 bg-white dark:bg-bg_dark px-4 py-6 rounded-lg box-shadow'>
				<h2 className='text-xl font-semibold'>All Blogs</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
					{blogs.map(blog => (
						<div
							key={blog._id}
							className='p-4 border rounded-lg shadow'
						>
							<h3 className='text-lg font-semibold'>
								{blog.title}
							</h3>
							<p className='text-sm text-gray-600'>
								{blog.category}
							</p>
							<p className='text-gray-700'>
								{blog.content.slice(0, 100)}...
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default BlogAdminPage
