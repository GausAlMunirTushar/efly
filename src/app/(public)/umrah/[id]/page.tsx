// UmrahDetailsPage.tsx
import React from 'react'

const UmrahDetailsPage = () => {
	return (
		<div className='container mx-auto px-4 py-6'>
			<div>
				<img
					src='/path-to-image.jpg' // Replace with actual image path or dynamic image import
					alt='Umrah Package'
					className='w-full h-96 object-cover rounded-lg'
				/>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<h1 className='text-3xl font-semibold text-gray-800 mb-4'>
						Standard Umrah Package
					</h1>
					<p className='text-lg text-gray-600'>Mecca, Saudi Arabia</p>

					<div className='mt-6'>
						<h3 className='text-xl font-semibold text-gray-800'>
							Package Includes
						</h3>
						<ul className='list-disc list-inside text-gray-700 mt-2'>
							<li>Round-trip airfare</li>
							<li>Hotel accommodations</li>
						</ul>
					</div>

					<div className='mt-6'>
						<h3 className='text-xl font-semibold text-gray-800'>
							Pricing
						</h3>
						<div className='mt-2'>
							<p className='text-lg text-gray-700'>
								Adult:{' '}
								<span className='font-semibold'>
									BDT 1,35,000
								</span>
							</p>
							<p className='text-lg text-gray-700'>
								Child:{' '}
								<span className='font-semibold'>
									BDT 12,500
								</span>
							</p>
							<p className='text-lg text-gray-700'>
								Infant:{' '}
								<span className='font-semibold'>
									BDT 45,000
								</span>
							</p>
						</div>
					</div>

					<div className='mt-6'>
						<h3 className='text-xl font-semibold text-gray-800'>
							Stay Plan
						</h3>
						<p className='text-lg text-gray-700'>
							Duration: 14 Days, 13 Nights
						</p>
					</div>

					<div className='mt-6'>
						<h3 className='text-xl font-semibold text-gray-800'>
							Tour Plan
						</h3>
						<p className='text-gray-700 mt-2'>
							The package is available if you pre-book only 10000
							Taka.
							<br />
							<strong>Flight Schedule:</strong>
							<ul className='list-disc list-inside mt-2 text-gray-700'>
								<li>
									Package 1: Before 5th of Ramadan to 10th
									Ramadan
								</li>
								<li>Package 2: 01st Ramadan to 15th Ramadan</li>
								<li>Package 3: 05th Ramadan to 20th Ramadan</li>
								<li>Package 4: 10th Ramadan to 25th Ramadan</li>
								<li>Package 5: 15th Ramadan to 30th Ramadan</li>
							</ul>
						</p>
					</div>

					<div className='mt-6'>
						<h3 className='text-xl font-semibold text-gray-800'>
							Inclusions
						</h3>
						<ul className='list-disc list-inside text-gray-700 mt-2'>
							<li>Airport transfers</li>
							<li>Guided city tours</li>
						</ul>
					</div>

					<div className='mt-6'>
						<h3 className='text-xl font-semibold text-gray-800'>
							Exclusions
						</h3>
						<ul className='list-disc list-inside text-gray-700 mt-2'>
							<li>Entrance fees to attractions</li>
							<li>Multilingual tour guides</li>
						</ul>
					</div>

					<div className='mt-6'>
						<h3 className='text-xl font-semibold text-gray-800'>
							Refund & Reissue Policy
						</h3>
						<p className='text-gray-700 mt-2'>
							Once the package is booked, the advance payment will
							be non-refundable.
						</p>
					</div>

					<div className='mt-6'>
						<h3 className='text-xl font-semibold text-gray-800'>
							Terms & Conditions
						</h3>
						<ul className='list-disc list-inside text-gray-700 mt-2'>
							<li>
								Hotel check-in time is at 4 PM and check-out
								time is at 12 PM.
							</li>
							<li>
								In case you do not like the room, we will assist
								with the room change.
							</li>
							<li>
								Shared bus transport for Ziyarat and private
								transport on request.
							</li>
							<li>
								80% advance payment and 20% payment before the
								flight.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UmrahDetailsPage
