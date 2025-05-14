'use client'

import VisaCard from '@/components/pages/front-pages/visa/VisaCard'
import { useEffect, useState } from 'react'

const VisaPage = () => {
	const [visas, setVisas] = useState<any[]>([]) // State to store the fetched visa data
	const [loading, setLoading] = useState<boolean>(true) // Loading state

	// Fetch visa data from the API
	useEffect(() => {
		const fetchVisaData = async () => {
			try {
				const response = await fetch('/api/visa')
				if (!response.ok) {
					throw new Error('Failed to fetch visa data')
				}
				const data = await response.json()
				setVisas(data) // Set visa data in state
			} catch (error) {
				console.error('Error fetching visa data:', error)
			} finally {
				setLoading(false) // Set loading state to false after fetching
			}
		}

		fetchVisaData() // Trigger the API request
	}, [])

	if (loading) {
		return <div>Loading...</div> // Show loading text while fetching data
	}

	return (
		<section className='container mx-auto'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
				{visas.length > 0 ? (
					visas.map((visa: any) => (
						<VisaCard
							key={visa._id}
							imageUrl={
								visa.countryImage || '/images/placeholder.webp'
							}
							visaType={visa.visaType}
							visaMode={visa.visaMode}
							entryType={visa.entryType}
							processingTime={visa.processingTime}
							visaValidity={visa.visaValidity}
							country={visa.country}
							maxStay={visa.maxStay}
							visaFee={visa.visaFee} // Assuming 'visaFee' field exists in the visa data
							serviceCharge={visa.serviceCharge} // Assuming 'serviceCharge' field exists in the visa data
						/>
					))
				) : (
					<p>No visas available</p>
				)}
			</div>
		</section>
	)
}

export default VisaPage
