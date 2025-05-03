'use client'

import { umrahPackages } from '@/data/umrahPackages'
import UmrahCard from './UmrahCard'

export const Umrah = () => {
	return (
		<section
			className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-x-4 gap-y-12 py-10 bg-white'
			aria-labelledby='umrah-heading'
		>
			{umrahPackages.map((pkg, idx) => (
				<div key={idx} className=''>
					<UmrahCard {...pkg} />
				</div>
			))}
		</section>
	)
}
