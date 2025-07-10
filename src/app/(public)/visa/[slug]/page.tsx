// app/visa/[slug]/page.tsx or pages/visa/[slug].tsx depending on your structure
'use client'

import { getCountryByName } from '@/services/countryService' // adjust path
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Country } from '@/services/countryService'

const VisaCountryPage = () => {
	const { slug } = useParams()
	const [country, setCountry] = useState<Country | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCountry = async () => {
			if (!slug) return
			try {
				const countryData = await getCountryByName(slug.toString())
				setCountry(countryData)
			} catch (error) {
				console.error('Failed to load country:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCountry()
	}, [slug])

	if (loading) return <div>Loading...</div>

	if (!country) return <div>Country not found</div>

	return (
		<div className='max-w-4xl mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-4'>{country.name}</h1>
			<p className='text-gray-700'>Code: {country.countryCode}</p>
			{country.image && (
				<img
					src={country.image}
					alt={country.name}
					className='mt-4 max-w-sm rounded shadow'
				/>
			)}
		</div>
	)
}

export default VisaCountryPage
