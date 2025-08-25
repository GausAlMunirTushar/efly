'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getCountryByName, Country } from '@/services/countryService'
import { getVisasByCountryName, Visa } from '@/services/visaService'
import VisaCard from '@/components/pages/front-pages/visa/VisaCard'
import Image from 'next/image'

const fallbackImage = '/images/placeholder.webp'

const VisaCountryPage = () => {
	const { slug } = useParams()
	const [country, setCountry] = useState<Country | null>(null)
	const [visas, setVisas] = useState<Visa[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			if (!slug) return

			try {
				// Fetch country by name (slug)
				const countryData = await getCountryByName(slug.toString())
				setCountry(countryData)

				// Fetch visas by country name
				const visaData = await getVisasByCountryName(slug.toString())
				setVisas(visaData)
			} catch (error) {
				console.error('Failed to load country or visas:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [slug])

	if (loading) return <div className='p-10 text-center'>Loading...</div>
	if (!country)
		return (
			<div className='p-10 text-center text-red-600'>
				Country not found
			</div>
		)
	const countryImage = country?.image

	return (
		<main className='bg-gray-100'>
			<div className='max-w-7xl mx-auto px-6 py-4'>
				{/* Country Info */}
				<section className='w-full relative h-auto rounded-lg bg-white'>
					<Image
						src={`${countryImage}`}
						alt='Visa Banner'
						width={1920}
						height={1080}
						layout='intrinsic'
						quality={100}
						priority
						className='rounded-lg w-full object-cover h-[550px]'
						sizes='(max-width: 640px) 80vw, (max-width: 768px) 100vw, 100vw'
					/>
				</section>

				{/* Visa Cards */}
				<div className='mt-6'>
					{visas.length === 0 ? (
						<p className='text-gray-500 text-center'>
							No visas found for this country.
						</p>
					) : (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
							{visas.map(visa => (
								<VisaCard
									key={visa._id}
									id={visa._id}
									slug={country.name
										.toLowerCase()
										.replace(/\s+/g, '-')}
									imageUrl={country.image}
									visaType={visa.visaType}
									visaMode='E-Visa' // Optional: replace with real data if available
									entryType='Single Entry' // Optional: make dynamic later
									processingTime={visa.processingTime}
									visaValidity={visa.visaValidity}
									maxStay={visa.maxStay}
									visaFee='1000' // TODO: make dynamic if available
									serviceCharge='200' // TODO: make dynamic if available
									country={country.name}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</main>
	)
}

export default VisaCountryPage
