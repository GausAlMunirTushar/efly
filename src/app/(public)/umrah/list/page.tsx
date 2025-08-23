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
			<div className='max-w-7xl mx-auto px-4 sm:px-6 py-4'>
				{/* Smaller height responsive image */}
				<section className='w-full relative h-auto rounded-lg bg-white'>
					<Image
						src={`/images/umrah/umrah-cover.png`}
						alt='Umrah Banner'
						width={1920}
						height={1080}
						layout='intrinsic'
						priority
						className='rounded-lg w-full object-cover h-[550px]' // Use object-cover to maintain the aspect ratio
						sizes='(max-width: 640px) 80vw, (max-width: 768px) 100vw, 100vw' // Adjust size based on screen width
					/>
					{/* Optional overlay */}
					{/* <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent rounded-lg"></div> */}
					{/* Optional Text */}
					{/* <h1 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-3xl md:text-4xl font-bold z-4 px-4 text-center">
    Best Umrah Packages from Bangladesh {CURRENT_YEAR} - {CURRENT_YEAR + 1}
  </h1> */}
				</section>

				<section className='mt-3'>
					<Umrah />
				</section>
			</div>
		</main>
	)
}

export default UmrahListPage
