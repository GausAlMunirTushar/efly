'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard, A11y } from 'swiper/modules'
import 'swiper/css'

import UmrahCard from './UmrahCard'
import { useEffect, useState } from 'react'

interface UmrahPackageFromDB {
	_id: string
	packagename: string
	description?: string
	price: number
	duration?: string
	images?: string[]
	includedServices?: string[]
	isFeatured?: boolean
	termsAndConditions?: string
	refundAndReissuePolicy?: string
	pricingDetails?: string
	createdAt?: string
	updatedAt?: string
}

const UmrahSlider = () => {
	const [umrahPackages, setUmrahPackages] = useState<UmrahPackageFromDB[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const res = await fetch('/api/umrah')
				if (!res.ok) throw new Error('Failed to fetch Umrah packages')
				const data: UmrahPackageFromDB[] = await res.json()
				setUmrahPackages(data)
			} catch (err: any) {
				setError(err.message || 'Unknown error')
			} finally {
				setLoading(false)
			}
		}
		fetchPackages()
	}, [])

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
				aria-label='Umrah packages slider'
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
				{umrahPackages.map(pkg => {
					const cardProps = {
						id: pkg._id,
						imageUrl:
							pkg.images && pkg.images.length > 0
								? pkg.images[0]
								: '/images/placeholder.webp',
						discount: undefined,
						packagename: pkg.packagename,
						description: pkg.description || '',
						duration: pkg.duration || 'N/A',
						price: `$${pkg.price.toFixed(2)}`
					}
					return (
						<div key={pkg._id}>
							<UmrahCard {...cardProps} />
						</div>
					)
				})}
			</Swiper>
		</div>
	)
}

export default UmrahSlider
