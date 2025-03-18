'use client'

import { usePathname } from 'next/navigation'

export default function BlogNavbar() {
	const pathname = usePathname()

	// Check if pathname is defined
	const formattedTitle = pathname
		? pathname
				.split('/') // Split the path by slashes
				.pop() // Get the last segment of the path
				?.replace(/-/g, ' ') // Replace dashes with spaces
				?.replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
		: 'Blog' // Default value if pathname is undefined

	return (
		<div className='flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 h-36'>
			<h1 className='text-4xl font-bold text-white'>{formattedTitle}</h1>
		</div>
	)
}
