'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const navItems = [
	{ name: 'Home', href: '/' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Flight', href: '/flight' },
	{ name: 'Hotel', href: '/hotel' },
	{ name: 'Holiday', href: '/holiday' },
	{ name: 'Umrah', href: '/umrah' },
	{ name: 'Hajj', href: '/hajj' },
	{ name: 'Visa', href: '/visa' },
	{ name: 'Activities', href: '/activities' }
]

const moreItems = [
	{ name: 'Package Deals', href: '/packages' },
	{ name: 'Travel Guide', href: '/guide' }
]

export default function HomeNavbar() {
	const [isDropdownOpen, setDropdownOpen] = useState(false)

	return (
		<nav className='flex items-center justify-between p-4 shadow-md bg-white'>
			{/* Logo */}
			<div className='flex items-center space-x-2'>
				<img src='/logo.png' alt='Logo' className='h-8 w-auto' />
				<span className='text-lg font-semibold text-blue-600'>
					efly
				</span>
			</div>

			{/* Navigation Links */}
			<div className='hidden md:flex items-center space-x-6'>
				{navItems.map(item => (
					<Link
						key={item.name}
						href={item.href}
						className='hover:text-blue-500'
					>
						{item.name}
					</Link>
				))}

				{/* Dropdown */}
				<div className='relative'>
					<button
						className='flex items-center hover:text-blue-500'
						onClick={() => setDropdownOpen(!isDropdownOpen)}
					>
						More <ChevronDown size={16} className='ml-1' />
					</button>
					{isDropdownOpen && (
						<div className='absolute mt-2 bg-white shadow-lg rounded-md p-2'>
							{moreItems.map(item => (
								<Link
									key={item.name}
									href={item.href}
									className='block px-4 py-2 hover:bg-gray-100'
								>
									{item.name}
								</Link>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Action Buttons */}
			<div className='flex items-center space-x-4'>
				<Link
					href='/promotions'
					className='px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-md'
				>
					Promotions
				</Link>
				<Link href='/contact' className='hover:text-blue-500'>
					Contact Us
				</Link>
				<Link
					href='/login'
					className='px-4 py-2 bg-blue-500 text-white rounded-md'
				>
					Login
				</Link>
			</div>
		</nav>
	)
}
