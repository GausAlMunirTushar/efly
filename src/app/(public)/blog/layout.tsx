'use client'

import { ReactNode } from 'react'
import BlogNavbar from '@/components/layouts/blog/BlogNavbar'
import BlogSidebar from '@/components/layouts/blog/BlogSidebar'
import BlogSlider from '@/components/pages/front-pages/blog/BlogSlider'

export default function BlogLayout({ children }: { children: ReactNode }) {
	return (
		<section>
			<BlogNavbar />
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
