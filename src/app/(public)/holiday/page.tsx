import HolidayPackageCard from '@/components/pages/front-pages/holiday/HolidayPackageCard'

export default function HolidayPage() {
	return (
		<section className='container mx-auto'>
			<div>
				<h1 className='text-3xl font-bold mb-2 mt-6 text-center'>
					Holiday Packages
				</h1>
				<p className='text-center'>
					{`Plan your perfect escape with efly! Discover top holiday deals for unforgettable international adventures.`}
				</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6'>
				<HolidayPackageCard
					imageUrl='/images/maldives.jpg'
					title='Sheraton Fullmoon Resort Tour Package - 03 Days 02 Nights | Maldives'
					location='Maldives'
					nightsInfo='2N Maldives'
					price={44499}
					tags={['Hotel', 'Transfer', 'Meals', 'Visa', 'Flight']}
				/>
				<HolidayPackageCard
					imageUrl='/images/nepal.jpg'
					title='Promotional Nepal Group Tour - 04 Days 03 Nights'
					description='Best Deal for Nepal!'
					location='Kathmandu & Nagarkot'
					nightsInfo='2N Kathmandu - 1N Nagarkot'
					price={12000}
					tags={['Flight', 'Hotel', 'Tour', 'Transfer', 'Meals']}
				/>
			</div>
		</section>
	)
}
