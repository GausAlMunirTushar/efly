'use client'

import { useState, useEffect } from 'react'
import { FaUmbrellaBeach, FaPassport, FaKaaba } from 'react-icons/fa'

import FlightSearch from './FlightSearch'
import HolidaySearch from './HolidaySearch'
import VisaSearch from './VisaSearch'
import UmrahSearch from './UmrahSearch'

import { motion, AnimatePresence } from 'framer-motion'
import { Plane } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

type Tab = 'flight' | 'hotel' | 'holiday' | 'visa' | 'umrah'

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
	{ key: 'flight', label: 'Flight', icon: <Plane /> },
	{ key: 'holiday', label: 'Holiday', icon: <FaUmbrellaBeach /> },
	{ key: 'visa', label: 'Visa', icon: <FaPassport /> },
	{ key: 'umrah', label: 'Umrah', icon: <FaKaaba /> }
]

export default function Search() {
	const pathname = usePathname()
	const router = useRouter()
	const [activeTab, setActiveTab] = useState<Tab>('flight')

	// Update the active tab based on the pathname
	useEffect(() => {
		if (pathname.includes('holiday')) {
			setActiveTab('holiday')
		} else if (pathname.includes('visa')) {
			setActiveTab('visa')
		} else if (pathname.includes('umrah')) {
			setActiveTab('umrah')
		} else {
			setActiveTab('flight')
		}
	}, [pathname])

	const renderTabContent = () => {
		switch (activeTab) {
			case 'flight':
				return <FlightSearch />
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

	// Function to change the URL when a tab is clicked
	const handleTabClick = (tab: Tab) => {
		setActiveTab(tab)
		router.push(`/${tab}`) // Change URL to reflect the active tab
	}

	return (
		<div className='relative w-full max-w-5xl mx-auto'>
			{/* Tabs */}
			<div className='relative flex justify-center'>
				<div className='bg-white shadow-md rounded-xl flex gap-2 sm:gap-4 px-2 py-2 -mb-4 mx-1 sm:mx-0'>
					{tabs.map(tab => (
						<motion.button
							key={tab.key}
							onClick={() => handleTabClick(tab.key)} // Trigger URL change and state update
							whileTap={{ scale: 0.95 }}
							whileHover={{ scale: 1.05 }}
							className={`flex flex-col sm:flex-row items-center w-16 sm:w-28 gap-2 px-2 sm:px-4 py-1 justify-between sm:justify-normal sm:py-3.5 rounded transition-all duration-200 text-sm ${
								activeTab === tab.key
									? 'bg-blue-100 text-blue-600 font-semibold'
									: 'text-gray-500 hover:text-blue-500'
							}`}
						>
							<span className='text-sm font-normal sm:text-lg sm:font-bold'>
								{tab.icon}
							</span>
							<span>{tab.label}</span>
						</motion.button>
					))}
				</div>
			</div>

			{/* Animated Tab Content */}
			<div className='bg-white rounded-xl shadow-md p-6 pt-10 mt-0 mx-2 sm:mx-8 z-10'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
					>
						{renderTabContent()}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
