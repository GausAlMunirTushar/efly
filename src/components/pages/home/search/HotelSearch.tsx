'use client'

import DateInput from '@/components/form/DateInput'
import SelectSearchInput from '@/components/form/SelectSearchInput'
import SelectDropdown from '@/components/form/SelectDropdown'
import { useState } from 'react'

const hotelLocations = [
	{ code: 'DAC', name: 'Dhaka' },
	{ code: 'CXB', name: "Cox's Bazar" },
	{ code: 'SYL', name: 'Sylhet' }
]

export default function HotelSearch() {
	const [location, setLocation] = useState<string>('CXB')
	const [checkIn, setCheckIn] = useState<string>('')
	const [checkOut, setCheckOut] = useState<string>('')
	const [guests, setGuests] = useState<number>(2)

	return (
		<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
			<SelectSearchInput
				label='City / Hotel'
				value={location}
				onChange={setLocation}
				options={hotelLocations}
			/>
			<DateInput label='Check In' value={checkIn} onChange={setCheckIn} />
			<DateInput
				label='Check Out'
				value={checkOut}
				onChange={setCheckOut}
			/>
			<div className='border p-3 rounded-md'>
				<label className='text-sm text-gray-600'>Guests</label>
				<SelectDropdown<number>
					value={guests}
					onChange={setGuests}
					options={[1, 2, 3, 4, 5]}
				/>
			</div>

			<div className='md:col-span-4 flex justify-end mt-4'>
				<button className='bg-orange-500 text-white px-6 py-2 rounded-md'>
					🔍 Search Hotels
				</button>
			</div>
		</div>
	)
}
