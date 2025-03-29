'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import BlogCard from '@/components/pages/front-pages/blog/BlogCard'
import SkeletonLoader from '@/components/common/SkeletonLoader'

export default function BlogList() {
	const [blogs, setBlogs] = useState([])
	const [loading, setLoading] = useState(true)
	const { category, slug } = useParams<{ category?: string; slug?: string }>()

	useEffect(() => {
		const fetchBlogs = async () => {
			setLoading(true)
			try {
				let url = '/api/blog'

				// Fetch specific blog if slug exists
				if (slug) {
					url = `/api/blog/${slug}`
				}
				// Fetch blogs by category if category exists
				else if (category) {
					url = `/api/blog?category=${category}`
				}

				const res = await fetch(url)
				if (!res.ok) throw new Error('Failed to fetch blogs')
				const data = await res.json()
				setBlogs(data) // Ensure it's an array
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		fetchBlogs()
	}, [category, slug])

	return (
		<div>
			{loading ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					<SkeletonLoader type='blog' />
					<SkeletonLoader type='blog' />
					<SkeletonLoader type='blog' />
				</div>
			) : blogs.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3  gap-6'>
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
