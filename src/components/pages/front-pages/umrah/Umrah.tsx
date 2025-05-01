'use client'

import UmrahSlider from './UmrahSlider'

export const Umrah = () => {
	return (
		<section className='py-10 bg-white' aria-labelledby='umrah-heading'>
			<h2
				id='umrah-heading'
				className='text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800'
			>
				Umrah Packages
			</h2>
			<UmrahSlider />
		</section>
	)
}
