import HolidayPackageCard from '@/components/pages/front-pages/holiday/HolidayPackageCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Holiday Packages - eFly Travel',
	description:
		'Plan your perfect escape with eFly! Explore holiday packages including hotels, meals, flights, and more to top international destinations.'
}

async function fetchHolidayPackages() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/holiday`, {
		cache: 'no-store'
	})
	if (!res.ok) throw new Error('Failed to load holiday packages')
	return res.json()
}

export default async function HolidayPage() {
	const packages = await fetchHolidayPackages()

	return (
		<section className='container mx-auto'>
			<div>
				<h1 className='text-3xl font-bold mb-2 mt-6 text-center'>
					Holiday Packages
				</h1>
				<p className='text-center'>
					{`Plan your perfect escape with eFly! Discover top holiday deals for unforgettable international adventures.`}
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6'>
				{packages.map((pkg: any) => (
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
				))}
			</div>
		</section>
	)
}
