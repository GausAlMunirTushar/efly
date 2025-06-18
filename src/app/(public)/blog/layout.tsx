'use client'

import { ReactNode, useState } from 'react'
import BlogNavbar from '@/components/layouts/blog/BlogNavbar'
import BlogSidebar from '@/components/layouts/blog/BlogSidebar'
import BlogSlider from '@/components/pages/front-pages/blog/BlogSlider'
import { Menu, X } from 'lucide-react'
import BlogMobileDrawer from '@/components/layouts/blog/BlogMobileDrawer'

export default function BlogLayout({ children }: { children: ReactNode }) {
	const [drawerOpen, setDrawerOpen] = useState(false)
	return (
		<section>
			<BlogNavbar />
			{/* Mobile Categories Header */}
			<div className='container mx-auto my-2 sm:hidden flex justify-between items-center px-4'>
				<h2 className='text-lg font-semibold text-gray-800'>
					Categories
				</h2>
				<button
					onClick={() => setDrawerOpen(true)}
					className='p-2 bg-primary text-white rounded-md'
				>
					<Menu size={20} />
				</button>
			</div>

			{/* Mobile Drawer */}
			<BlogMobileDrawer
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			/>

			<div className='container mx-auto my-4'>
				<BlogSlider />
			</div>
			<div className='container mx-auto flex gap-6 my-2 w-full'>
				<div className='w-full hidden sm:block sm:w-2/12 h-full'>
					<BlogSidebar />
				</div>
				<div className='w-full sm:w-10/12 my-4'>{children}</div>
			</div>
		</section>
	)
}
