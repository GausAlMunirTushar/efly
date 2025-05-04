'use client'

import { useState } from 'react'
import {
	FaPlane,
	FaHotel,
	FaUmbrellaBeach,
	FaPassport,
	FaKaaba
} from 'react-icons/fa'
import UmrahSearch from './UmrahSearch'
import VisaSearch from './VisaSearch'
import HolidaySearch from './HolidaySearch'
import HotelSearch from './HotelSearch'
import FlightSearch from './FlightSearch'

type Tab = 'flight' | 'hotel' | 'holiday' | 'visa' | 'umrah'

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
	{ key: 'flight', label: 'Flight', icon: <FaPlane /> },
	{ key: 'hotel', label: 'Hotel', icon: <FaHotel /> },
	{ key: 'holiday', label: 'Holidays', icon: <FaUmbrellaBeach /> },
	{ key: 'visa', label: 'Visa', icon: <FaPassport /> },
	{ key: 'umrah', label: 'Umrah', icon: <FaKaaba /> }
]

export default function Search() {
	const [activeTab, setActiveTab] = useState<Tab>('flight')

	const renderTabContent = () => {
		switch (activeTab) {
			case 'flight':
				return <FlightSearch />
			case 'hotel':
				return <HotelSearch />
			case 'holiday':
				return <HolidaySearch />
			case 'visa':
				return <VisaSearch />
			case 'umrah':
				return <UmrahSearch />
			default:
				return null
		}
	}

	return (
		<div className='bg-white rounded-xl shadow-lg p-4 w-full max-w-4xl mx-auto'>
			{/* Top Tab Menu */}
			<div className='flex justify-center gap-4 border-b pb-4 mb-4'>
				{tabs.map(tab => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={`flex items-center gap-2 px-4 py-2 rounded-t-md ${
							activeTab === tab.key
								? 'bg-white shadow text-red-600 font-semibold'
								: 'text-gray-500'
						}`}
					>
						{tab.icon}
						<span>{tab.label}</span>
					</button>
				))}
			</div>

			{/* Tab Content */}
			{renderTabContent()}
		</div>
	)
}
