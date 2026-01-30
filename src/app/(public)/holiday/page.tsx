import Search from '@/components/pages/home/search/Search'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Best Holiday Package From Bangladesh | bijoyAir Travel`,
	description:
		'Explore affordable and authentic Umrah packages from Bangladesh including flights, hotels, and guided tours. Book your spiritual journey today!',
	keywords: [
		'Umrah packages',
		'Umrah from Bangladesh',
		'Affordable Umrah',
		'Best Umrah deals',
		'Umrah 2025',
		'Umrah travel packages',
		'bijoyAir Travel'
	]
}

export default function HolidayPageClient() {
	return (
		<main>
			<section
				className=' bg-cover bg-center bg-no-repeat py-14'
				style={{
					backgroundImage: "url('/images/holiday/holiday.jpg')"
				}}
			>
				<Search />
			</section>
		</main>
	)
}
