'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
	{
		id: 1,
		image: '/images/slider/slide-1.png',
		title: 'Explore Community Tourism',
		badge: 'স্বপ্নজয়'
	},
	{
		id: 2,
		image: '/images/slider/slide-2.jpg',
		title: 'Enjoy Skylounge Exclusive Access',
		price: 'BDT 2,500'
	},
	{
		id: 3,
		image: '/images/slider/slide-1.png',
		title: '15% OFF with SkyTrip on Flights'
	}
]

export default function Slider() {
	const prevRef = useRef<HTMLButtonElement>(null)
	const nextRef = useRef<HTMLButtonElement>(null)

	return (
		<div className='relative w-full mx-auto'>
			{/* Custom Navigation Buttons */}
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
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={20}
				slidesPerView={1.2}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current
				}}
				pagination={{ clickable: true }}
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				breakpoints={{
					640: { slidesPerView: 1.5 },
					1024: { slidesPerView: 2.5 }
				}}
				className='rounded-lg overflow-hidden'
			>
				{slides.map(slide => (
					<SwiperSlide key={slide.id} className='relative'>
						<div className='relative h-56 md:h-64 lg:h-72 w-full rounded-lg'>
							<Image
								src={slide.image}
								alt={slide.title}
								layout='fill'
								className='object-cover rounded-lg'
								priority
							/>
							{/* Overlay for better readability */}
							<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 rounded-lg flex flex-col justify-end p-4 text-white'>
								<h3 className='text-lg font-semibold'>
									{slide.title}
								</h3>
								{slide.price && (
									<span className='text-sm bg-white text-black px-2 py-1 rounded-md mt-2 inline-block'>
										{slide.price}
									</span>
								)}
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
