import HolidayPackageCard from '@/components/pages/front-pages/holiday/HolidayPackageCard'

export default function HolidayPage() {
	return (
		<section className='container mx-auto'>
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
