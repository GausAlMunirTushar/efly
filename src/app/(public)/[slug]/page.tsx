'use client'

import { useEffect, useState } from 'react'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import BlogDetailsSidebar from '@/components/layouts/blog/BlogDetailsSidebar'
import LatestBlog from '@/components/pages/front-pages/blog/LatestBlog'
import PopularBlog from '@/components/pages/front-pages/blog/PopularBlog'
import Image from 'next/image'

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
					setError('Failed to load blog')
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
		return <div className='text-center text-red-500'>{error}</div>
	}

	return (
		<section className=''>
			{/* Hero Section */}
			{/* <div className='relative w-full h-36'>
				{blog.imageUrl && (
					<img
						src={blog.imageUrl}
						alt={blog.title}
						className='absolute inset-0 w-full h-full object-cover '
					/>
				)}
				<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70'>
					<h1 className='text-3xl font-bold text-center text-white'>
						{blog.title}
					</h1>
				</div>
			</div> */}

			{/* Blog Content & Sidebar */}
			<div className='max-w-7xl mx-auto py-6 px-4'>
				{/* Blog Content */}
				<div className='w-full'>
					{blog.imageUrl && (
						<div className='relative w-full aspect-[683/300] rounded-lg border mb-4 overflow-hidden'>
							<Image
								src={blog.imageUrl}
								alt={blog.title}
								fill
								className='object-fill'
								// sizes='(max-width: 768px) 100vw, 768px'
								priority
							/>
						</div>
					)}
					<div className='grid grid-cols-1 md:grid-cols-8 gap-6'>
						<div className='md:col-span-6'>
							<h1 className='text-3xl font-bold mb-2'>
								{blog.title}
							</h1>
							<p className='text-gray-500 text-sm mb-4'>
								{blog.category?.name}
							</p>

							<div
								className='mt-4 text-gray-700 leading-relaxed w-full text-wrap'
								dangerouslySetInnerHTML={{
									__html: blog.content
								}}
							/>

							{/* Tags */}
							{blog.tags && blog.tags.length > 0 && (
								<div className='mt-4 flex flex-wrap gap-2'>
									<strong className='text-gray-600'>
										Tags:
									</strong>
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
							<div>
								<PopularBlog />
							</div>
						</div>
						{/* Sidebar */}
						<div className='md:col-span-2'>
							<BlogDetailsSidebar />
							<div className='mt-4'>
								<LatestBlog />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
