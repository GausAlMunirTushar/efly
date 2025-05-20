'use client'

import Button from '@/components/form/Button'
import SelectSearchInput from '@/components/form/SelectSearchInput'
import { Search } from 'lucide-react'
import { useState } from 'react'

const destinations = [
	{ code: 'TH', name: 'Thailand' },
	{ code: 'ID', name: 'Indonesia' },
	{ code: 'BD', name: 'Bangladesh' }
]

export default function HolidaySearch() {
	const [destination, setDestination] = useState<string>('TH')

	return (
		<div className='flex flex-col items-center justify-center gap-2'>
			<SelectSearchInput
				label='Destination'
				value={destination}
				onChange={setDestination}
				options={destinations}
			/>
			<div className=''>
				<Button className='flex justify-center items-center'>
					<Search size={16} className='mr-2' /> Search Holiday
				</Button>
			</div>
		</div>
	)
}
