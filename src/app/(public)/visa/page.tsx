'use client'

import { useEffect, useState } from 'react'
import VisaCard from '@/components/pages/front-pages/visa/VisaCard'
import Search from '@/components/pages/home/search/Search'
import { getVisas, Visa } from '@/services/visaService'

const VisaPage = () => {
	const [visas, setVisas] = useState<Visa[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchVisaData = async () => {
			try {
				const data = await getVisas()
				setVisas(data)
			} catch (error) {
				console.error('Error fetching visa data:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchVisaData()
	}, [])

	return (
		<main>
			<section
				className='bg-cover bg-center bg-no-repeat py-14'
				style={{ backgroundImage: "url('/images/visa/visa.jpg')" }}
			>
				<Search />
			</section>
			<section className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
					{visas.length > 0 ? (
						visas.map(visa => (
							<VisaCard
								key={visa._id}
								imageUrl={
									visa.country.image ||
									'/images/placeholder.webp'
								}
								visaType={visa.visaType}
								visaMode={visa.visaMode || 'E-Visa'}
								entryType={'Single Entry'}
								processingTime={visa.processingTime}
								visaValidity={visa.visaValidity}
								country={visa.country.name}
								maxStay={visa.maxStay}
								visaFee={visa.visaFee || '0'}
								serviceCharge={visa.serviceCharge || '0'}
							/>
						))
					) : (
						<p>No visas available</p>
					)}
				</div>
			</section>
		</main>
	)
}

export default VisaPage
