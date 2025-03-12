'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from 'next/image'

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
	const [isMenuOpen, setMenuOpen] = useState(false)
	const pathname = usePathname() // Get current pathname

	return (
		<nav className='flex items-center justify-between px-4  border-b bg-white'>
			{/* Logo */}
			<div className='flex items-center space-x-2'>
				<Image
					src='/logo.png'
					alt='Logo'
					width={40}
					height={40}
					className='h-8 w-auto'
				/>
				<span className='text-lg font-semibold text-primary'>efly</span>
			</div>

			{/* Desktop Navigation */}
			<div className='hidden md:flex items-center space-x-6 pt-4'>
				{navItems.map(item => (
					<Link
						key={item.name}
						href={item.href}
						className={`relative pb-3 text-gray-800 ${
							pathname === item.href
								? 'border-b-4 border-primary text-primary transition-all duration-500'
								: 'hover:border-b-4 hover:border-primary hover:text-primary transition-all duration-500'
						}`}
					>
						{item.name}
					</Link>
				))}

				{/* Dropdown */}
				<div className='relative'>
					<button
						className='flex text-gray-800 items-center pb-2 hover:text-primary hover:border-b-4 hover:border-primary'
						onClick={() => setDropdownOpen(!isDropdownOpen)}
					>
						More <ChevronDown size={16} className='ml-1' />
					</button>
					{isDropdownOpen && (
						<div className='absolute mt-2 bg-white shadow-lg rounded-md p-2 w-40'>
							{moreItems.map(item => (
								<Link
									key={item.name}
									href={item.href}
									className={`block px-4 py-2 hover:bg-gray-100 ${
										pathname === item.href
											? 'bg-gray-200'
											: ''
									}`}
								>
									{item.name}
								</Link>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Action Buttons (Desktop) */}
			<div className='hidden md:flex items-center space-x-4'>
				<Link href='/contact' className='hover:text-primary'>
					Contact Us
				</Link>
				<Link
					href='/login'
					className='px-4 py-2 bg-primary text-white rounded-md'
				>
					Login
				</Link>
			</div>

			{/* Mobile Menu Icon */}
			<button
				className='md:hidden text-gray-600'
				onClick={() => setMenuOpen(!isMenuOpen)}
			>
				{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className='absolute top-14 left-0 w-full bg-white shadow-md md:hidden'>
					<div className='flex flex-col items-start px-4 py-2 space-y-2'>
						{navItems.map(item => (
							<Link
								key={item.name}
								href={item.href}
								className={`w-full px-4 py-2 border-l-4 ${
									pathname === item.href
										? 'border-primary text-primary'
										: 'border-transparent hover:border-primary hover:text-primary'
								}`}
							>
								{item.name}
							</Link>
						))}

						{/* Dropdown for Mobile */}
						<div className='w-full'>
							<button
								className='w-full flex justify-between px-4 py-2 border-l-4 border-transparent hover:border-primary hover:text-primary'
								onClick={() => setDropdownOpen(!isDropdownOpen)}
							>
								More <ChevronDown size={16} />
							</button>
							{isDropdownOpen && (
								<div className='w-full bg-gray-100 rounded-md p-2'>
									{moreItems.map(item => (
										<Link
											key={item.name}
											href={item.href}
											className={`block px-4 py-2 hover:bg-gray-200 ${
												pathname === item.href
													? 'bg-gray-300'
													: ''
											}`}
										>
											{item.name}
										</Link>
									))}
								</div>
							)}
						</div>

						{/* Action Buttons (Mobile) */}
						<Link
							href='/contact'
							className='w-full px-4 py-2 border-l-4 border-transparent hover:border-primary hover:text-primary'
						>
							Contact Us
						</Link>
						<Link
							href='/login'
							className='w-full px-4 py-2 bg-primary text-white rounded-md text-center'
						>
							Login
						</Link>
					</div>
				</div>
			)}
		</nav>
	)
}
