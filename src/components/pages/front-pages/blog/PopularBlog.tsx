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
			<h2 className='text-xl font-bold my-4'>Popular Blogs</h2>

			{loading ? (
				<div className='space-y-3'>
					<SkeletonLoader type='blog' />
					<SkeletonLoader type='blog' />
					<SkeletonLoader type='blog' />
				</div>
			) : latestBlogs.length > 0 ? (
				<div className='w-full flex flex-row flex-wrap gap-4'>
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
