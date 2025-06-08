'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import HolidayPackageCard from '@/components/pages/front-pages/holiday/HolidayPackageCard'
import { Search } from 'lucide-react'
import Image from 'next/image'

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
		<main>
			<section className='w-full relative h-[20vh] sm:h-[25vh] md:h-[30vh] lg:h-[35vh] xl:h-[40vh]'>
				<Image
					src='/images/holiday/holiday.jpg'
					alt='holiday Banner'
					fill
					style={{ objectFit: 'cover' }}
					priority
					sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw'
				/>

				<div className='absolute inset-0 bg-black bg-opacity-40'></div>
				<div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent'></div>

				<h1 className='absolute inset-0 flex items-center justify-center text-white text-xl sm:text-3xl md:text-4xl font-bold z-10 px-4 text-center'>
					Best Holiday Packages from Bangladesh
				</h1>
			</section>
			<section className='container mx-auto'>
				{loading ? (
					<p className='text-center mt-10'>Loading packages...</p>
				) : error ? (
					<p className='text-red-500 text-center mt-10'>{error}</p>
				) : packages.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>
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
		</main>
	)
}
