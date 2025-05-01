'use client'

import HomeNavbar from '@/components/layouts/HomeNavbar'
import Navbar from '@/components/layouts/Navbar'
import UserSidebar from '@/components/layouts/UserSidebar'
import { useState } from 'react'

export default function UserDashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [isPersistent, setIsPersistent] = useState(false)

	const toggleSidebar = () => {
		setIsPersistent(!isPersistent)
		setIsExpanded(!isPersistent)
	}

	return (
		<section className='h-screen bg-gray-100  transition-all duration-300'>
			{/* Navbar */}
			<div className='sticky top-0 z-10'>
				<HomeNavbar />
			</div>
			{/* Main Content - No extra spacing issues */}
			<div className='flex h-screen container mx-auto transition-all duration-300 bg-gray-100'>
				<aside className='mt-4 h-screen overflow-y-auto'>
					{/* Sidebar */}
					<UserSidebar
						isExpanded={isExpanded}
						setIsExpanded={setIsExpanded}
					/>
				</aside>
				{/* Scrollable Content */}
				<main className='flex-1 overflow-y-auto scrollbar-none m-4'>
					{children}
				</main>
			</div>
		</section>
	)
}
