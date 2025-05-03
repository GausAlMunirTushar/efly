'use client'

import UserSidebar from '@/components/layouts/UserSidebar'

export default function UserDashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<section className='h-screen bg-gray-100  transition-all duration-300'>
			{/* Main Content - No extra spacing issues */}
			<div className='flex max-w-6xl h-screen container mx-auto transition-all duration-300 bg-gray-100'>
				<aside className='mt-4 '>
					{/* Sidebar */}
					<UserSidebar />
				</aside>
				{/* Scrollable Content */}
				<main className='flex-1 overflow-y-auto scrollbar-none m-4'>
					{children}
				</main>
			</div>
		</section>
	)
}
