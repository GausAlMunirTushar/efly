'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard, A11y } from 'swiper/modules'
import 'swiper/css'

import HolidayPackageCard from './HolidayPackageCard'

interface HolidayPackage {
	_id: string
	imageUrl: string
	title: string
	description?: string
	location: string
	nightsInfo: string
	price: number
	tags: string[]
}

const HolidayHomeSlider = () => {
	const [packages, setPackages] = useState<HolidayPackage[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const res = await fetch('/api/holiday')
				if (!res.ok) throw new Error('Failed to fetch holiday packages')
				const data = await res.json()
				setPackages(data)
			} catch (err: any) {
				setError(err.message || 'Something went wrong')
			} finally {
				setLoading(false)
			}
		}

		fetchPackages()
	}, [])

	if (loading)
		return <div className='text-center py-10'>Loading packages...</div>
	if (error)
		return <div className='text-center py-10 text-red-500'>{error}</div>
	if (packages.length === 0)
		return <div className='text-center py-10'>No packages found.</div>

	return (
		<div className='w-full py-10 -z-50'>
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
				speed={3000}
				grabCursor
				aria-label='Holiday packages slider'
				breakpoints={{
					640: { slidesPerView: 1.5 },
					768: { slidesPerView: 2.5 },
					1024: { slidesPerView: 3.2 },
					1280: { slidesPerView: 4 }
				}}
			>
				{packages.map(pkg => (
					<SwiperSlide key={pkg._id}>
						<HolidayPackageCard
							{...pkg}
							slug={pkg.location}
							id={pkg._id}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default HolidayHomeSlider
