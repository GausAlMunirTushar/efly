'use client'

import SelectSearchInput from '@/components/form/SelectSearchInput'
import DateInput from '@/components/form/DateInput'
import { useState } from 'react'

const destinations = [
	{ code: 'TH', name: 'Thailand' },
	{ code: 'ID', name: 'Indonesia' },
	{ code: 'BD', name: 'Bangladesh' }
]

export default function HolidaySearch() {
	const [destination, setDestination] = useState<string>('TH')
	const [startDate, setStartDate] = useState<string>('')

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
			<SelectSearchInput
				label='Destination'
				value={destination}
				onChange={setDestination}
				options={destinations}
			/>
			<DateInput
				label='Start Date'
				value={startDate}
				onChange={setStartDate}
			/>
			<div className='md:col-span-1 flex items-end justify-end'>
				<button className='bg-orange-500 text-white px-6 py-2 rounded-md'>
					🌴 Find Packages
				</button>
			</div>
		</div>
	)
}
