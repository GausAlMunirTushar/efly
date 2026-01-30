import Search from '@/components/pages/home/search/Search'
import type { Metadata } from 'next'

const CURRENT_YEAR = new Date().getFullYear()

export const metadata: Metadata = {
	title: `Umrah Package From Bangladesh ${CURRENT_YEAR} - ${CURRENT_YEAR + 1} | bijoyAir Travel`,
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

const UmrahPage = () => {
	return (
		<main>
			<section
				className=' bg-cover bg-center bg-no-repeat py-14'
				style={{ backgroundImage: "url('/images/umrah/umrah.jpg')" }}
			>
				<Search />
			</section>
		</main>
	)
}

export default UmrahPage
