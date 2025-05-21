'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Users, CalendarDays } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface PackageDetails {
	title: string
	description: string
	location: string
	nightsInfo: string
	price: number
}

export default function HolidaySlider({
	images,
	packageDetails
}: {
	images: string[]
	packageDetails: PackageDetails
}) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)

	return (
		<div className='bg-white rounded-lg p-4 md:p-6  flex flex-col md:flex-row gap-6'>
			{/* Left Image Section with Swiper Slider */}
			<div className='md:w-2/3'>
				<div className='relative w-full h-72 md:h-full rounded-lg overflow-hidden'>
					<Swiper
						modules={[Navigation, Pagination]}
						navigation
						pagination={{ clickable: true }}
						onSlideChange={swiper =>
							setSelectedImageIndex(swiper.activeIndex)
						}
						className='h-full rounded-lg'
					>
						{images.map((img, index) => (
							<SwiperSlide key={index}>
								<div className='relative w-full h-72 md:h-[400px]'>
									<Image
										src={img}
										alt={`Slide ${index + 1}`}
										fill
										className='object-cover rounded-lg'
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>

			{/* Right Info Section */}
			<div className='md:w-1/3 space-y-4'>
				<div>
					<h2 className='text-xl font-semibold text-primary'>
						{packageDetails.title}
					</h2>
					<div className='flex items-center text-muted-foreground text-sm mt-1'>
						<MapPin className='w-4 h-4 mr-1' />
						{packageDetails.location}
					</div>
				</div>

				{/* Image Thumbnails */}
				<div className='w-full h-40  '>
					<div className='flex mt-3 gap-3'>
						{images.map((img, index) => (
							<button
								key={index}
								className={`w-1/4 h-20 relative rounded overflow-hidden border-2 ${selectedImageIndex === index ? 'border-primary' : 'border-transparent'}`}
								onClick={() => setSelectedImageIndex(index)}
							>
								<Image
									src={img}
									alt={`Thumbnail ${index + 1}`}
									fill
									className='rounded-md object-cover'
								/>
							</button>
						))}
					</div>
				</div>

				<ul className='space-y-2 text-sm text-muted-foreground'>
					<li className='flex items-center'>
						<CalendarDays className='w-4 h-4 mr-2' />{' '}
						{packageDetails.nightsInfo}
					</li>
					<li className='flex items-center'>
						<Users className='w-4 h-4 mr-2' />
						From 2 to 6 people
					</li>
					<li className='flex items-start'>
						<CalendarDays className='w-4 h-4 mr-2 mt-1' />
						80% of the fees will be refunded if the booking is
						canceled more than 21 days before the beginning of the
						tour.
					</li>
				</ul>

				<div>
					<h3 className='text-sm font-semibold text-primary'>
						Requirements
					</h3>
					<p className='text-sm text-muted-foreground'>
						Copy of NID card
					</p>
				</div>
			</div>
		</div>
	)
}
