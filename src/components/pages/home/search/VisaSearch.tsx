'use client'

import SelectSearchInput from '@/components/form/SelectSearchInput'
import { useState } from 'react'

const visaCountries = [
	{ code: 'USA', name: 'United States' },
	{ code: 'UK', name: 'United Kingdom' },
	{ code: 'CAN', name: 'Canada' },
	{ code: 'AUS', name: 'Australia' }
]

export default function VisaSearch() {
	const [country, setCountry] = useState<string>('USA')

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<SelectSearchInput
				label='Visa for Country'
				value={country}
				onChange={setCountry}
				options={visaCountries}
			/>
			<div className='flex items-end justify-end'>
				<button className='bg-orange-500 text-white px-6 py-2 rounded-md'>
					🛂 Check Visa Info
				</button>
			</div>
		</div>
	)
}
