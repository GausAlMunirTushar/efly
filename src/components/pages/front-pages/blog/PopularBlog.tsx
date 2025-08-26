'use client'

import { useEffect, useState } from 'react'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import PopularBlogCard from './PopularBlogCard'

interface Blog {
	_id: string
	slug: string
	title: string
	content: string
	imageUrl: string
	createdAt: string
}

export default function PopularBlog() {
	const [latestBlogs, setLatestBlogs] = useState<Blog[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchLatestBlogs = async () => {
			try {
				const res = await fetch('/api/blog?limit=4')
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
		<div className='p bg-white  rounded-lg'>
			<h2 className='text-2xl font-bold mt-4 mb-2'>Popular Blog</h2>

			{loading ? (
				<div className='space-y-3'>
					<SkeletonLoader type='blog' />
					<SkeletonLoader type='blog' />
					<SkeletonLoader type='blog' />
				</div>
			) : latestBlogs.length > 0 ? (
				<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{latestBlogs.map(blog => (
						<PopularBlogCard key={blog._id} blog={blog} />
					))}
				</div>
			) : (
				<p className='text-gray-500 text-center'>No blogs available.</p>
			)}
		</div>
	)
}
