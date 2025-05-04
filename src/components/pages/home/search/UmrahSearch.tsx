'use client'

import DateInput from '@/components/form/DateInput'
import { useState } from 'react'

export default function UmrahSearch() {
	const [departureDate, setDepartureDate] = useState<string>('')

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<DateInput
				label='Preferred Departure Date'
				value={departureDate}
				onChange={setDepartureDate}
			/>
			<div className='flex items-end justify-end'>
				<button className='bg-orange-500 text-white px-6 py-2 rounded-md'>
					🕋 Search Umrah Packages
				</button>
			</div>
		</div>
	)
}
