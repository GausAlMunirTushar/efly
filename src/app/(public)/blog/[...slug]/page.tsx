'use client'

import { useEffect, useState } from 'react'
import SkeletonLoader from '@/components/common/SkeletonLoader'

export default function Page({
	params
}: {
	params: Promise<{ slug: string | string[] }>
}) {
	const [blog, setBlog] = useState<any>(null)
	const [categories, setCategories] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [loadingCategories, setLoadingCategories] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null) // Error state

	const [resolvedParams, setResolvedParams] = useState<{
		slug: string | string[]
	} | null>(null)

	useEffect(() => {
		params.then(resolved => {
			setResolvedParams(resolved)
		})
	}, [params])

	useEffect(() => {
		const fetchCategories = async () => {
			setLoadingCategories(true)
			try {
				const res = await fetch('/api/categories')
				if (!res.ok) throw new Error('Failed to fetch categories')
				const data = await res.json()
				setCategories(data)
			} catch (error) {
				console.error(error)
				setError('Failed to load categories') // Set error message
			} finally {
				setLoadingCategories(false)
			}
		}

		fetchCategories()
	}, [])

	useEffect(() => {
		const fetchBlog = async () => {
			if (resolvedParams?.slug) {
				const slug = Array.isArray(resolvedParams.slug)
					? resolvedParams.slug.join('/')
					: resolvedParams.slug

				const API_URL =
					process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
				try {
					const res = await fetch(`/api/blog/${slug}`, {
						cache: 'no-store'
					})
					if (!res.ok) {
						throw new Error('Blog not found')
					}
					const data = await res.json()
					setBlog(data)
				} catch (error) {
					console.error(error)
					setError('Failed to load blog') // Set error message
				} finally {
					setLoading(false)
				}
			}
		}

		fetchBlog()
	}, [resolvedParams])

	if (loading || !blog) {
		return <SkeletonLoader type='blog' />
	}

	if (error) {
		return <div className='text-center text-red-500'>{error}</div> // Show error message if any
	}

	return (
		<section>
			<div className='relative w-full h-36'>
				{blog.imageUrl && (
					<img
						src={blog.imageUrl}
						alt={blog.title}
						className='absolute inset-0 w-full h-full object-cover rounded-lg'
					/>
				)}
				<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
					<h1 className='text-3xl font-bold text-center text-white'>
						{blog.title}
					</h1>
				</div>
			</div>

			<div className='container mx-auto py-2 grid grid-cols-1 md:grid-cols-4 gap-6'>
				{/* Blog Content */}
				<div className='md:col-span-3 '>
					{blog.imageUrl && (
						<img
							src={blog.imageUrl}
							alt={blog.title}
							className='w-full h-[500px] object-cover rounded-lg'
						/>
					)}
					<h1 className='text-3xl font-bold mb-2'>{blog.title}</h1>
					<p className='text-gray-500 text-sm'>
						{blog.category?.name}
					</p>

					<p className='mt-4 text-gray-700 leading-relaxed'>
						{blog.content}
					</p>

					{/* Tags */}
					{blog.tags && blog.tags.length > 0 && (
						<div className='mt-4 flex flex-wrap gap-2'>
							<strong className='text-gray-600'>Tags:</strong>
							{blog.tags.map((tag: string) => (
								<span
									key={tag}
									className='bg-blue-100 text-blue-700 px-2 py-1 text-sm rounded-md'
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>

				{/* Sidebar */}
			</div>
			<div></div>
		</section>
	)
}
