'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard, A11y } from 'swiper/modules'
import 'swiper/css'

import VisaCard from '@/components/pages/front-pages/visa/VisaCard'
import { useEffect, useState } from 'react'

const VisaSlider = () => {
	const [visas, setVisas] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchVisas = async () => {
			try {
				const response = await fetch('/api/visa')
				if (!response.ok) {
					throw new Error('Failed to fetch visa data')
				}
				const data = await response.json()
				setVisas(data)
			} catch (error) {
				console.error('Error loading visa data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchVisas()
	}, [])

	if (loading) return <div>Loading visa packages...</div>

	if (!visas.length) return <div>No visa packages available.</div>

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
				aria-label='Visa packages slider'
				breakpoints={{
					640: { slidesPerView: 1.5 },
					768: { slidesPerView: 2.5 },
					1024: { slidesPerView: 3.2 },
					1280: { slidesPerView: 4 }
				}}
			>
				{visas.map((visa: any) => (
					<SwiperSlide key={visa._id}>
						<VisaCard
							imageUrl={
								visa.countryImage || '/images/placeholder.webp'
							}
							id={visa._id}
							slug={visa.slug}
							visaType={visa.visaType}
							visaMode={visa.visaMode}
							entryType={visa.entryType}
							processingTime={visa.processingTime}
							visaValidity={visa.visaValidity}
							maxStay={visa.maxStay}
							visaFee={visa.visaFee}
							serviceCharge={visa.serviceCharge}
							country={visa.country}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default VisaSlider
