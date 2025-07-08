'use client'

import { useEffect, useState } from 'react'
import BlogCard from '@/components/pages/front-pages/blog/BlogCard'
import SkeletonLoader from '@/components/common/SkeletonLoader'

interface Blog {
	_id: string
	slug: string
	title: string
	content: string
	imageUrl: string
	createdAt: string
}

export default function LatestBlog() {
	const [latestBlogs, setLatestBlogs] = useState<Blog[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchLatestBlogs = async () => {
			try {
				const res = await fetch('/api/blog?limit=3')
				if (!res.ok) throw new Error('Failed to fetch latest blogs')
				const data = await res.json()
				setLatestBlogs(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		fetchLatestBlogs()
	}, [])

	return (
		<div className='p-4 bg-white rounded-lg'>
			<h2 className='text-xl font-bold mb-4'>Latest Blogs</h2>

			{loading ? (
				<div className='space-y-3'>
					<SkeletonLoader type='blog' />
					<SkeletonLoader type='blog' />
					<SkeletonLoader type='blog' />
				</div>
			) : latestBlogs.length > 0 ? (
				<div className='space-y-4'>
					{latestBlogs.map(blog => (
						<BlogCard key={blog._id} blog={blog} />
					))}
				</div>
			) : (
				<p className='text-gray-500 text-center'>No blogs available.</p>
			)}
		</div>
	)
}
