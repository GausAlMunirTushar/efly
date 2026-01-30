'use client'

import Image from 'next/image'
import { Airline } from '@/types/Airline'
import { ChevronRight } from 'lucide-react'

interface MostPopularAirlinesProps {
	airlines: Airline[]
}

export default function MostPopularAirlines({
	airlines
}: MostPopularAirlinesProps) {
	return (
		<section className='py-12 px-4 sm:px-6 lg:px-8 '>
			<div className='max-w-7xl mx-auto text-center sm:px-8'>
				<h2 className='text-3xl font-bold text-gray-900 mb-2'>
					Most Popular Airlines
				</h2>
				<p className='text-gray-600 mb-10'>
					Discover top airlines on bijoyair and seamlessly search any
					flight and get any online ticket instantly, granting you
					effortless access to global travel.
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4	 gap-6'>
					{airlines.map((airline, index) => (
						<div
							key={index}
							className='flex justify-between  items-center gap-3 bg-gray-100 hover:bg-gray-200 transition rounded-md px-4 py-3 cursor-pointer'
						>
							<div className='flex items-center  gap-4 sm:gap-1'>
								<Image
									src={airline.logo}
									alt={airline.name}
									width={32}
									height={32}
									className='object-contain'
								/>
								<span className='text-sm font-medium text-gray-800 text-wrap '>
									{airline.name}
								</span>
							</div>
							<ChevronRight className='w-4 h-4' />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
