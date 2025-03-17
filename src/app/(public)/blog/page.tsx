'use client'

import { useEffect, useState } from 'react'
import BlogCard from '@/components/pages/front-pages/blog/BlogCard'
import SkeletonLoader from '@/components/common/SkeletonLoader'

interface Category {
	_id: string
	name: string
	slug: string
	blogCount: number // blog count should exist in each category
}

export default function BlogPage() {
	const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

	const [blogs, setBlogs] = useState([])
	const [categories, setCategories] = useState<Category[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null
	)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch(`/api/categories`)
				if (!res.ok) throw new Error('Failed to fetch categories')
				const data = await res.json()
				setCategories(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchCategories()
	}, [])

	useEffect(() => {
		const fetchBlogs = async () => {
			setLoading(true)
			try {
				const url = selectedCategory
					? `/api/blog?categories=${selectedCategory}`
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
	}, [selectedCategory])

	return (
		<section className=''>
			<div className='flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 h-36'>
				<h1 className='text-4xl font-bold text-white'>Blog</h1>
			</div>

			<div className='container mx-auto flex gap-6 my-2'>
				{/* Sidebar */}
				<aside className='w-2/12 h-full bg-gray-100 px-4 py-2 my-4 rounded-lg'>
					<h2 className='text-lg text-gray-700 font-bold mb-2'>
						Categories
					</h2>
					{/* Show Skeleton for Categories */}
					{loading ? (
						<SkeletonLoader type='category' />
					) : (
						<ul>
							<li
								className={`cursor-pointer p-1.5 px-4 rounded ${
									!selectedCategory
										? 'bg-primary text-white'
										: 'border border-primary'
								}`}
								onClick={() => setSelectedCategory(null)}
							>
								All (
								{categories.reduce(
									(total, category) =>
										total + category.blogCount,
									0
								)}
								)
							</li>
							{categories.map((category: any) => (
								<li
									key={category._id}
									className={`cursor-pointer p-1.5 px-3 rounded my-2 ${
										selectedCategory === category._id
											? 'bg-primary text-white'
											: 'border border-primary hover:bg-primary hover:text-white transition-colors duration-300'
									}`}
									onClick={() =>
										setSelectedCategory(category._id)
									}
								>
									{category.name} ({category.blogCount ?? 0})
								</li>
							))}
						</ul>
					)}
				</aside>

				{/* Blog Grid */}
				<div className='w-10/12 my-4'>
					{/* Show Skeleton for Blogs */}
					{loading ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							<SkeletonLoader type='blog' />
							<SkeletonLoader type='blog' />
							<SkeletonLoader type='blog' />
						</div>
					) : blogs.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{blogs.map((blog: any) => (
								<BlogCard key={blog._id} blog={blog} />
							))}
						</div>
					) : (
						<p className='text-center text-gray-500'>
							No blogs available.
						</p>
					)}
				</div>
			</div>
		</section>
	)
}
