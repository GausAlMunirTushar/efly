import Image from 'next/image'
import React from 'react'
import type { Metadata } from 'next'
import { Umrah } from '@/components/pages/front-pages/umrah/Umrah'

const CURRENT_YEAR = new Date().getFullYear()

export const metadata: Metadata = {
	title: `Umrah Package From Bangladesh ${CURRENT_YEAR} - ${CURRENT_YEAR + 1} | eFly Travel`,
	description:
		'Explore affordable and authentic Umrah packages from Bangladesh including flights, hotels, and guided tours. Book your spiritual journey today!',
	keywords: [
		'Umrah packages',
		'Umrah from Bangladesh',
		'Affordable Umrah',
		'Best Umrah deals',
		'Umrah 2025',
		'Umrah travel packages',
		'eFly Travel'
	]
}

const UmrahListPage = () => {
	return (
		<main className='bg-gray-100'>
			<div className='max-w-7xl mx-auto px-6 py-4'>
				{/* Smaller height responsive image */}
				<section className='w-full relative h-[180px] sm:h-[230px] rounded-lg bg-white'>
					<Image
						src={`/images/umrah/umrah.jpg`}
						alt='Umrah Banner'
						fill
						style={{ objectFit: 'cover' }}
						priority
						className='rounded-lg'
						sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw'
					/>
					<div className='absolute inset-0 bg-black bg-opacity-40 rounded-lg'></div>
					<div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent rounded-lg'></div>
					<h1 className='absolute inset-0 flex items-center justify-center text-white text-xl sm:text-3xl md:text-4xl font-bold z-4 px-4 text-center'>
						Best Umrah Packages from Bangladesh {CURRENT_YEAR} -{' '}
						{CURRENT_YEAR + 1}
					</h1>
				</section>
				<section className='mt-3'>
					<Umrah />
				</section>
			</div>
		</main>
	)
}

export default UmrahListPage
