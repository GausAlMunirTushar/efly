'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import HolidayPackageCard from '@/components/pages/front-pages/holiday/HolidayPackageCard'
import { Search } from 'lucide-react'

interface HolidayPackage {
	_id: string
	imageUrl: string
	title: string
	description: string
	location: { name: string }
	nightsInfo: string
	price: number
	tags: string[]
}

export default function HolidayPageClient() {
	const [packages, setPackages] = useState<HolidayPackage[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const searchParams = useSearchParams()
	const location = searchParams.get('location') || ''

	useEffect(() => {
		const fetchHolidayPackages = async () => {
			try {
				let url = `/api/holiday`
				if (location) {
					url += `?location=${encodeURIComponent(location)}`
				}
				const res = await fetch(url)
				if (!res.ok) {
					const errorText = await res.text()
					throw new Error(
						errorText || 'Failed to load holiday packages'
					)
				}
				const data = await res.json()
				setPackages(data)
			} catch (err: any) {
				setError(err.message || 'Something went wrong')
			} finally {
				setLoading(false)
			}
		}

		fetchHolidayPackages()
	}, [location])

	return (
		<section className='container mx-auto'>
			<div>
				<h1 className='text-3xl font-bold mb-2 mt-6 text-center'>
					Holiday Packages
				</h1>
				<p className='text-center'>
					{location
						? `Showing holiday packages for selected destination.`
						: `Plan your perfect escape with eFly! Discover top holiday deals for unforgettable international adventures.`}
				</p>
			</div>

			{loading ? (
				<p className='text-center mt-10'>Loading packages...</p>
			) : error ? (
				<p className='text-red-500 text-center mt-10'>{error}</p>
			) : packages.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6'>
					{packages.map(pkg => (
						<HolidayPackageCard
							key={pkg._id}
							id={pkg._id}
							imageUrl={pkg.imageUrl}
							title={pkg.title}
							description={pkg.description}
							location={pkg.location?.name || ''}
							nightsInfo={pkg.nightsInfo}
							price={pkg.price}
							tags={pkg.tags}
						/>
					))}
				</div>
			) : (
				<p className='text-center col-span-full mt-10'>
					No holiday packages found.
				</p>
			)}
		</section>
	)
}
