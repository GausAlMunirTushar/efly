'use client'

import Image from 'next/image'
import { Airline } from '@/types/Airline'

interface MostPopularAirlinesProps {
	airlines: Airline[]
}

export default function MostPopularAirlines({
	airlines
}: MostPopularAirlinesProps) {
	return (
		<section className='py-12 px-4 sm:px-6 lg:px-8 bg-white'>
			<div className='max-w-7xl mx-auto text-center'>
				<h2 className='text-3xl font-bold text-gray-900 mb-2'>
					Most Popular Airlines
				</h2>
				<p className='text-gray-600 mb-10'>
					Discover top airlines on ShareTrip and seamlessly search any
					flight and get any online ticket instantly, granting you
					effortless access to global travel.
				</p>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
					{airlines.map((airline, index) => (
						<div
							key={index}
							className='flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition rounded-md px-4 py-3 cursor-pointer'
						>
							<Image
								src={airline.logo}
								alt={airline.name}
								width={32}
								height={32}
								className='object-contain'
							/>
							<span className='text-sm font-medium text-gray-800'>
								{airline.name}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
