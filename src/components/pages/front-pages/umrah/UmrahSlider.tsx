'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import UmrahCard from './UmrahCard'
import { umrahPackages } from '@/data/umrahPackages'

const UmrahSlider = () => {
	return (
		<div className='w-full px-4 py-10'>
			<Swiper
				modules={[Autoplay]}
				spaceBetween={20}
				slidesPerView={3}
				loop={true}
				autoplay={{
					delay: 0,
					disableOnInteraction: false,
					pauseOnMouseEnter: true
				}}
				speed={5000}
				grabCursor
				className='w-full'
			>
				{umrahPackages.map((pkg, idx) => (
					<SwiperSlide key={idx}>
						<UmrahCard {...pkg} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default UmrahSlider
