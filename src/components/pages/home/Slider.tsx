'use client'

import { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

export type SlideItem = {
	id: number
	image: string
	link: string
}

type CustomSliderProps = {
	slides?: SlideItem[]
}

export default function CustomSlider({ slides = [] }: CustomSliderProps) {
	const [sliderData, setSliderData] = useState<SlideItem[]>([])
	const prevRef = useRef<HTMLButtonElement | null>(null)
	const nextRef = useRef<HTMLButtonElement | null>(null)

	useEffect(() => {
		// Fetch the slide data from the API
		const fetchSlides = async () => {
			try {
				const response = await fetch('/api/homeslides')
				const data = await response.json()

				// Assuming the response is an array of slide objects
				if (Array.isArray(data)) {
					setSliderData(data)
				}
			} catch (error) {
				console.error('Failed to fetch slides:', error)
			}
		}

		fetchSlides()
	}, [])

	return (
		<div className='relative w-full mx-auto py-4 sm:py-8'>
			<button
				ref={prevRef}
				className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:flex focus:outline-none'
				aria-label='Previous slide'
			>
				<ChevronLeft className='h-6 w-6 text-gray-600' />
			</button>
			<button
				ref={nextRef}
				className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:flex focus:outline-none'
				aria-label='Next slide'
			>
				<ChevronRight className='h-6 w-6 text-gray-600' />
			</button>

			<Swiper
				modules={[Navigation, Autoplay]}
				spaceBetween={20}
				slidesPerView={1}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current
				}}
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				breakpoints={{
					640: { slidesPerView: 1 },
					768: { slidesPerView: 2 },
					1024: { slidesPerView: 3 }
				}}
				className='rounded-lg overflow-hidden'
			>
				{sliderData.length > 0 ? (
					sliderData.map(slide => (
						<SwiperSlide key={slide.id} className='relative group'>
							<div className='relative h-56  w-full rounded-lg overflow-hidden cursor-pointer'>
								<Link href={slide.link} target='_blank'>
									<Image
										src={slide.image}
										alt={`Slide ${slide.id}`}
										fill
										className='object-fill transition-transform duration-300 group-hover:scale-110'
										priority
									/>
									<Link
										href={slide.link}
										target='_blank'
										className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-white font-bold px-4 py-2 text-sm rounded-lg shadow-md'
									>
										<span className='flex items-center gap-1'>
											Details <ArrowUpRight size={18} />
										</span>
									</Link>
								</Link>
							</div>
						</SwiperSlide>
					))
				) : (
					<p className='text-center text-gray-500 py-8'>
						No slides available.
					</p>
				)}
			</Swiper>
		</div>
	)
}
