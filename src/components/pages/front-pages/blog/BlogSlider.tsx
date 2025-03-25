'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import Link from 'next/link'

type Blog = {
	_id: string
	slug: string
	title: string
	imageUrl: string
	category?: string
}

export default function BlogSlider() {
	const [blogs, setBlogs] = useState<Blog[]>([])
	const [loading, setLoading] = useState(true)
	const { category } = useParams<{ category?: string }>()

	useEffect(() => {
		const fetchBlogs = async () => {
			setLoading(true)
			try {
				let url = '/api/blog'
				if (category) url = `/api/blog?category=${category}`
				const res = await fetch(url)
				if (!res.ok) throw new Error('Failed to fetch blogs')
				const data: Blog[] = await res.json()
				setBlogs(data.slice(0, 3)) // Take only the first 3 blogs
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		fetchBlogs()
	}, [category])

	if (loading) {
		return <SkeletonLoader type='blog' />
	}

	if (blogs.length === 0) {
		return <p className='text-center text-gray-500'>No blogs available.</p>
	}

	return (
		<div className='w-full  mx-auto relative'>
			{/* Custom Navigation Buttons */}
			<button
				className='absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:flex focus:outline-none'
				aria-label='Previous slide'
			>
				<ChevronLeft className='h-6 w-6 text-gray-600' />
			</button>
			<button
				className='absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:flex focus:outline-none'
				aria-label='Next slide'
			>
				<ChevronRight className='h-6 w-6 text-gray-600' />
			</button>

			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={20}
				slidesPerView={1.2}
				pagination={{ clickable: true }}
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				// breakpoints={{
				// 	640: { slidesPerView: 1.5 },
				// 	1024: { slidesPerView: 2.5 }
				// }}
				className='w-full rounded-lg overflow-hidden'
			>
				{blogs.map(blog => (
					<SwiperSlide key={blog._id} className='relative w-full'>
						<div className='relative h-56 md:h-64 lg:h-96 w-full rounded-lg'>
							<Link href={`/${blog.slug}`}>
								<img
									src={blog.imageUrl}
									alt={blog.title}
									className='w-full h-full object-fill rounded-lg'
								/>
								{/* Overlay for better readability */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 rounded-lg flex flex-col justify-end p-4 text-white'>
									<h3 className='text-lg font-semibold'>
										{blog.title}
									</h3>
								</div>
							</Link>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
