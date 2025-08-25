'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getLocationByName } from '@/services/locationService'
import Image from 'next/image'
import { getAllHolidays } from '@/services/holidayService'
import HolidayPackageCard from '@/components/pages/front-pages/holiday/HolidayPackageCard'
import titleCase from '@/utils/titleCase'

interface HolidayPackage {
	_id: string
	imageUrl: string
	title: string
	description: string
	location: { name: string; _id: string }
	nightsInfo: string
	price: number
	tags: string[]
}

export default function HolidayDestinationPage() {
	const params = useParams()
	const slug = params?.slug as string // e.g. "dhaka"
	const [location, setLocation] = useState<any>(null)
	const [packages, setPackages] = useState<HolidayPackage[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchLocationAndPackages = async () => {
			try {
				if (!slug) return

				// Step 1: Get location by name (slug)
				const locationData = await getLocationByName(slug)
				setLocation(locationData)

				// Step 2: Get holidays by location ID
				if (locationData?._id) {
					const data = await getAllHolidays(
						`?location=${locationData._id}`
					)

					const mappedPackages: HolidayPackage[] = data.map(
						(item: any) => ({
							_id: item._id,
							imageUrl: item.imageUrl,
							title: item.title,
							description: item.description,
							location: item.location,
							nightsInfo: item.nightsInfo,
							price: item.price,
							tags: item.tags
						})
					)

					setPackages(mappedPackages)
				}
			} catch (err: any) {
				setError(err.message || 'Something went wrong')
			} finally {
				setLoading(false)
			}
		}

		fetchLocationAndPackages()
	}, [slug])

	return (
		<main className='bg-gray-100'>
			<div className='max-w-7xl mx-auto py-4 px-4'>
				{/* Hero Banner */}
				<section className='w-full relative h-auto rounded-lg bg-white'>
					<Image
						src='/images/holiday/singapure-tour.jpg'
						alt='holiday Banner'
						width={1920}
						height={1080}
						layout='intrinsic'
						priority
						quality={100}
						className='rounded-lg w-full object-cover h-[550px]'
						sizes='(max-width: 640px) 80vw, (max-width: 768px) 100vw, 100vw'
					/>
				</section>
				{/* Holiday Packages */}
				<section className='max-w-7xl mx-auto'>
					{loading ? (
						<p className='text-center mt-4'>Loading packages...</p>
					) : error ? (
						<p className='text-red-500 text-center mt-4'>{error}</p>
					) : packages.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 my-5'>
							{packages.map(pkg => (
								<HolidayPackageCard
									key={pkg._id}
									slug={slug}
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
						<p className='text-center col-span-full mt-4'>
							No holiday packages found.
						</p>
					)}
				</section>
			</div>
		</main>
	)
}
