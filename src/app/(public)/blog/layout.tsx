'use client'

import { ReactNode } from 'react'
import BlogNavbar from '@/components/layouts/blog/BlogNavbar'
import BlogSidebar from '@/components/layouts/blog/BlogSidebar'

export default function BlogLayout({ children }: { children: ReactNode }) {
	return (
		<section>
			<BlogNavbar />
			<div className='container mx-auto flex gap-6 my-2'>
				<BlogSidebar />
				<div className='w-10/12 my-4'>{children}</div>
			</div>
		</section>
	)
}
