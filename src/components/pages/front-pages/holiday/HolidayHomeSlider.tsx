'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard, A11y } from 'swiper/modules'
import 'swiper/css'

import HolidayPackageCard from './HolidayPackageCard'
import { holidayPackages } from '@/data/holidayPackages'

const HolidayHomeSlider = () => {
	return (
		<div className='w-full py-10'>
			<Swiper
				modules={[Autoplay, Keyboard, A11y]}
				spaceBetween={30}
				slidesPerView={1.2}
				loop={true}
				keyboard
				autoplay={{
					delay: 0,
					disableOnInteraction: false,
					pauseOnMouseEnter: true
				}}
				speed={5000}
				grabCursor
				aria-label='Holiday packages slider'
				breakpoints={{
					640: {
						slidesPerView: 1.5
					},
					768: {
						slidesPerView: 2.5
					},
					1024: {
						slidesPerView: 3.2
					},
					1280: {
						slidesPerView: 4
					}
				}}
			>
				{holidayPackages.map((pkg, idx) => (
					<SwiperSlide key={idx}>
						<HolidayPackageCard {...pkg} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default HolidayHomeSlider
