'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import BlogCard from '@/components/pages/front-pages/blog/BlogCard'
import SkeletonLoader from '@/components/common/SkeletonLoader'

export default function BlogList() {
	const [blogs, setBlogs] = useState([])
	const [loading, setLoading] = useState(true)
	const { category } = useParams<{ category?: string }>()

	useEffect(() => {
		const fetchBlogs = async () => {
			setLoading(true)
			try {
				const url = category
					? `/api/blog?category=${category}`
					: `/api/blog`
				const res = await fetch(url)
				if (!res.ok) throw new Error('Failed to fetch blogs')
				const data = await res.json()
				setBlogs(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		fetchBlogs()
	}, [category])

	return (
		<div>
			{/* Show Skeleton while loading */}
			{loading ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					<SkeletonLoader type='blog' />
					<SkeletonLoader type='blog' />
					<SkeletonLoader type='blog' />
				</div>
			) : blogs.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{blogs.map((blog: any) => (
						<BlogCard
							key={blog._id}
							blog={blog}
							category={category}
						/>
					))}
				</div>
			) : (
				<p className='text-center text-gray-500'>No blogs available.</p>
			)}
		</div>
	)
}
