'use client'

import Navbar from '@/components/layouts/Navbar'
import Sidebar from '@/components/layouts/Sidebar'
import { useState } from 'react'

export default function DashboardLayout({
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
		<section className='h-screen flex bg-gray-100 dark:bg-body_dark transition-all duration-300'>
			{/* Sidebar */}
			<Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

			{/* Main Content - No extra spacing issues */}
			<div className='flex flex-1 flex-col transition-all duration-300'>
				{/* Navbar */}
				<header className='w-full py-3 px-4'>
					<Navbar />
				</header>

				{/* Scrollable Content */}
				<main className='flex-1 overflow-y-auto px-4'>{children}</main>
			</div>
		</section>
	)
}
