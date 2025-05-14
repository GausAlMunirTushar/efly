'use client'

import Button from '@/components/form/Button'
import SelectSearchInput from '@/components/form/SelectSearchInput'
import { Search } from 'lucide-react'
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
		<section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<div className=''>
				<SelectSearchInput
					label='Visa for Country'
					value={country}
					onChange={setCountry}
					options={visaCountries}
				/>
			</div>
			<div className='flex items-end justify-end'>
				<Button className=''>
					<Search size={20} className='mr-2' /> Visa
				</Button>
			</div>
		</section>
	)
}
