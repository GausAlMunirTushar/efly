'use client'

import UserMobileMenu from '@/components/layouts/UserMobileMenu'
import UserSidebar from '@/components/layouts/UserSidebar'

export default function UserDashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<section className='min-h-screen bg-gray-100  transition-all duration-300'>
			{/* Main Content - No extra spacing issues */}
			<div className='md:flex max-w-6xl min-h-screen sm:mx-auto transition-all duration-300 bg-gray-100'>
				<aside className='mt-4 hidden md:block'>
					{/* Sidebar */}
					<UserSidebar />
				</aside>
				<aside className='block md:hidden pt-4'>
					<UserMobileMenu />
				</aside>
				{/* Scrollable Content */}
				<main className='flex-1 overflow-y-auto scrollbar-none m-4'>
					{children}
				</main>
			</div>
		</section>
	)
}
