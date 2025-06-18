'use client'

import { useState } from 'react'
import {
	FaPlane,
	FaHotel,
	FaUmbrellaBeach,
	FaPassport,
	FaKaaba
} from 'react-icons/fa'

import { motion, AnimatePresence } from 'framer-motion'

type Tab = 'flight' | 'hotel' | 'holiday' | 'visa' | 'umrah'

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
	{ key: 'flight', label: 'Flight', icon: <FaPlane /> },
	{ key: 'hotel', label: 'Hotel', icon: <FaHotel /> },
	{ key: 'holiday', label: 'Holidays', icon: <FaUmbrellaBeach /> },
	{ key: 'visa', label: 'Visa', icon: <FaPassport /> },
	{ key: 'umrah', label: 'Umrah', icon: <FaKaaba /> }
]

const BookingTab = () => {
	const [activeTab, setActiveTab] = useState<Tab>('flight')
	return (
		<>
			{/* Tabs */}
			<div className='relative flex'>
				<div className='rounded-xl flex gap-4 py-2 -mb-4 overflow-x-auto z-20'>
					{tabs.map(tab => (
						<motion.button
							key={tab.key}
							onClick={() => setActiveTab(tab.key)}
							whileTap={{ scale: 0.95 }}
							whileHover={{ scale: 1.05 }}
							className={`bg-white w-28 gap-2 px-4 py-4 rounded transition-all duration-200 text-sm  ${
								activeTab === tab.key
									? 'bg-blue-200 border border-blue-500 text-blue-600 font-semibold shadow'
									: 'text-gray-500 hover:text-blue-500'
							}`}
						>
							<div className='min-w-20 flex flex-col items-center gap-4'>
								<span className='text-lg font-bold'>
									{tab.icon}
								</span>
								<span>{tab.label}</span>
							</div>
						</motion.button>
					))}
				</div>
			</div>
		</>
	)
}

export default BookingTab
