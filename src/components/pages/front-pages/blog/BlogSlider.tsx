'use client'

import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import Link from 'next/link'

type Slide = {
	_id: string
	image: string
	link: string
}

export default function BlogSlider() {
	const [slides, setSlides] = useState<Slide[]>([])
	const [loading, setLoading] = useState(true)

	const swiperRef = useRef<any>(null)

	useEffect(() => {
		const fetchSlides = async () => {
			setLoading(true)
			try {
				const res = await fetch('/api/blogslides')
				if (!res.ok) throw new Error('Failed to fetch slides')
				const data: Slide[] = await res.json()
				setSlides(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		fetchSlides()
	}, [])

	if (loading) {
		return <SkeletonLoader type='blog' />
	}

	if (slides.length === 0) {
		return <div className='text-center text-gray-500'></div>
	}

	return (
		<div className='w-full mx-auto relative'>
			{/* Custom Navigation Buttons */}
			<button
				className='absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:flex focus:outline-none'
				aria-label='Previous slide'
				onClick={() => swiperRef.current?.slidePrev()}
			>
				<ChevronLeft className='h-6 w-6 text-gray-600' />
			</button>
			<button
				className='absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:flex focus:outline-none'
				aria-label='Next slide'
				onClick={() => swiperRef.current?.slideNext()}
			>
				<ChevronRight className='h-6 w-6 text-gray-600' />
			</button>

			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={0}
				slidesPerView={1}
				pagination={{ clickable: true }}
				autoplay={{ delay: 2000, disableOnInteraction: false }}
				className='w-full rounded-lg overflow-hidden'
				ref={swiperRef}
			>
				{slides.map(slide => (
					<SwiperSlide key={slide._id} className='relative'>
						<div className='relative h-56 md:h-64 lg:h-96 w-full rounded-lg'>
							<Link href={slide.link} target='_blank'>
								<img
									src={slide.image}
									alt='Slide image'
									className='w-full h-full object-fill rounded-lg'
								/>
							</Link>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
