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
		<section className='h-screen bg-gray-100 dark:bg-body_dark transition-all duration-300'>
			{/* Navbar */}
			<HomeNavbar />
			{/* Main Content - No extra spacing issues */}
			<div className='flex transition-all duration-300'>
				<aside className='mt-4'>
					{/* Sidebar */}
					<UserSidebar
						isExpanded={isExpanded}
						setIsExpanded={setIsExpanded}
					/>
				</aside>
				{/* Scrollable Content */}
				<main className='flex-1 overflow-y-auto p-4'>{children}</main>
			</div>
		</section>
	)
}
