import HolidayPackageCard from '@/components/pages/front-pages/holiday/HolidayPackageCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Holiday Packages - eFly Travel',
	description:
		'Plan your perfect escape with eFly! Explore holiday packages including hotels, meals, flights, and more to top international destinations.'
}

async function fetchHolidayPackages(location?: string) {
	let url = `${process.env.NEXT_PUBLIC_APP_URL}/api/holiday`
	if (location) {
		url += `?location=${encodeURIComponent(location)}`
	}
	const res = await fetch(url, { cache: 'no-store' })
	if (!res.ok) throw new Error('Failed to load holiday packages')
	return res.json()
}

// Accept searchParams with location query param
export default async function HolidayPage({
	searchParams
}: {
	searchParams?: { location?: string }
}) {
	const location = searchParams?.location || ''

	const packages = await fetchHolidayPackages(location)

	return (
		<section className='container mx-auto'>
			<div>
				<h1 className='text-3xl font-bold mb-2 mt-6 text-center'>
					Holiday Packages {location ? `in ${location}` : ''}
				</h1>
				<p className='text-center'>
					{location
						? `Showing holiday packages available in ${location}.`
						: `Plan your perfect escape with eFly! Discover top holiday deals for unforgettable international adventures.`}
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6'>
				{packages.length > 0 ? (
					packages.map((pkg: any) => (
						<HolidayPackageCard
							key={pkg._id}
							id={pkg._id}
							imageUrl={pkg.imageUrl}
							title={pkg.title}
							description={pkg.description}
							location={pkg.location}
							nightsInfo={pkg.nightsInfo}
							price={pkg.price}
							tags={pkg.tags}
						/>
					))
				) : (
					<p className='text-center col-span-full'>
						No holiday packages found.
					</p>
				)}
			</div>
		</section>
	)
}
