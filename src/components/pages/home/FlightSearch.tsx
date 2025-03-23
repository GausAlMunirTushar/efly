'use client'

import { useState } from 'react'
import TabButton from '@/components/form/TabButton'
import ToggleButton from '@/components/form/ToggleButton'
import DateInput from '@/components/form/DateInput'
import SelectDropdown from '@/components/form/SelectDropdown'
import SelectSearchInput from '@/components/form/SelectSearchInput'

// Define Types
type TripType = 'one-way' | 'round-trip' | 'multi-city'
type Location = { code: string; name: string }
type ClassType = 'Economy' | 'Business' | 'First Class'

// Constants
const tripTypes: { label: string; value: TripType }[] = [
	{ label: 'One Way', value: 'one-way' },
	{ label: 'Round Trip', value: 'round-trip' },
	{ label: 'Multi City', value: 'multi-city' }
]
const locations: Location[] = [
	{ code: 'DAC', name: 'Dhaka (DAC)' },
	{ code: 'CXB', name: "Cox's Bazar (CXB)" },
	{ code: 'JFK', name: 'New York (JFK)' },
	{ code: 'SFO', name: 'San Francisco (SFO)' }
]
const travellersOptions = [1, 2, 3, 4, 5]
const classOptions: ClassType[] = ['Economy', 'Business', 'First Class']

export default function FlightSearch() {
	const [tripType, setTripType] = useState<TripType>('one-way')
	const [from, setFrom] = useState<string>('DAC')
	const [to, setTo] = useState<string>('CXB')
	const [date, setDate] = useState<string>('')
	const [travellers, setTravellers] = useState<number>(1)
	const [classType, setClassType] = useState<ClassType>('Economy')

	return (
		<div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto'>
			{/* Navigation Tabs */}
			<div className='flex gap-6 border-b pb-3'>
				{['Flight', 'Hotel', 'Shop', 'Holiday', 'Visa'].map(tab => (
					<TabButton
						key={tab}
						label={tab}
						isActive={tab === 'Flight'}
					/>
				))}
			</div>

			{/* Trip Type Selection */}
			<div className='flex gap-3 my-4'>
				{tripTypes.map(({ label, value }) => (
					<ToggleButton
						key={value}
						label={label}
						isActive={tripType === value}
						onClick={() => setTripType(value)}
					/>
				))}
			</div>

			{/* Input Fields */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				<SelectSearchInput
					label='From'
					value={from}
					onChange={setFrom}
					options={locations}
				/>
				<SelectSearchInput
					label='To'
					value={to}
					onChange={setTo}
					options={locations}
				/>
				<DateInput label='Date' value={date} onChange={setDate} />
				<div className='border p-3 rounded-md'>
					<label className='text-sm text-gray-600'>
						Travellers & Class
					</label>
					<div className='flex items-center gap-2 mt-1'>
						<SelectDropdown<number>
							value={travellers}
							onChange={setTravellers}
							options={travellersOptions}
						/>
						<SelectDropdown<ClassType>
							value={classType}
							onChange={setClassType}
							options={classOptions}
						/>
					</div>
				</div>
			</div>

			{/* Search Button */}
			<div className='mt-4 flex justify-end'>
				<button className='bg-orange-500 text-white px-6 py-2 rounded-md flex items-center gap-2'>
					🔍 Search Flights
				</button>
			</div>
		</div>
	)
}
