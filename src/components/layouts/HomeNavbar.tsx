'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import UserProfileDropdown from './UserProfileDropown'
import Cookies from 'js-cookie'

const navItems = [
	{ name: 'Home', href: '/' },
	{ name: 'Flight', href: '/flight' },
	{ name: 'Holiday', href: '/holiday' },
	{ name: 'Visa', href: '/visa' },
	{ name: 'Umrah', href: '/umrah' },
	{
		name: 'More',
		href: '#',
		submenu: [
			{ name: 'Blog', href: '/blog' },
			{ name: 'Gallery', href: '/gallery' }
		]
	}
]

export default function HomeNavbar() {
	const [isMenuOpen, setMenuOpen] = useState(false)
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
	const pathname = usePathname()
	const token = Cookies.get('token') // Get the token from cookies

	// Explicitly type the index parameter as a number
	const handleMouseEnter = (index: number) => setActiveDropdown(index)
	const handleMouseLeave = () => setActiveDropdown(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () =>
			document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<nav className='bg-white shadow'>
			<div className='container mx-auto flex justify-between items-center py-4'>
				{/* Logo */}
				<div className='flex items-center space-x-2'>
					<Link href='/' className='cursor-pointer'>
						<img
							src='/efly.png'
							alt='Logo'
							width={40}
							height={40}
							className='h-8 w-auto'
						/>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className='hidden md:flex items-center'>
					{navItems.map((item, index) => (
						<div
							key={item.name}
							className='relative'
							onMouseEnter={() =>
								item.submenu && handleMouseEnter(index)
							}
							onMouseLeave={handleMouseLeave}
						>
							<Link
								href={item.href}
								className={`relative text-gray-800 font-semibold px-4 py-6 ${
									pathname === item.href
										? 'text-primary'
										: 'hover:bg-primary hover:text-white hover:border-primary transition-all duration-500'
								}`}
							>
								{item.name}
							</Link>

							{/* Submenu */}
							{item.submenu && activeDropdown === index && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3 }}
									className='absolute mt-6 bg-white shadow min-w-48'
								>
									{item.submenu.map(subitem => (
										<Link
											key={subitem.name}
											href={subitem.href}
											className={`block py-2.5 hover:bg-gray-100 ${
												pathname === subitem.href
													? 'bg-gray-200'
													: 'hover:bg-primary hover:text-white hover:border-primary transition-all duration-500'
											}`}
										>
											<div className='flex px-2 items-center gap-2'>
												<ChevronRight
													size={18}
													className='text-primary hover:text-white'
												/>{' '}
												{subitem.name}
											</div>
										</Link>
									))}
								</motion.div>
							)}
						</div>
					))}
				</div>

				{/* Action Buttons (Desktop) */}
				<div className='hidden md:flex items-center space-x-4'>
					<Link
						href='/contact'
						className='w-full px-4 py-2 hover:text-primary '
					>
						Contact Us
					</Link>
					{token ? (
						// Show Profile Icon if token exists
						<div className='relative'>
							<button
								onClick={() => setDropdownOpen(!dropdownOpen)}
								className='flex items-center space-x-2'
							>
								<img
									src='/profile-icon.png' // Add a profile icon here
									alt='Profile'
									width={30}
									height={30}
									className='rounded-full'
								/>
							</button>

							{/* Animated Profile Dropdown */}
							<AnimatePresence>
								{dropdownOpen && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{
											duration: 0.2,
											ease: 'easeInOut'
										}}
										className='absolute right-0 mt-1 w-48 bg-white dark:bg-bg_dark rounded-md shadow-lg'
									>
										<UserProfileDropdown
											onClose={() =>
												setDropdownOpen(false)
											}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					) : (
						// Show Login Button if token does not exist
						<Link
							href='/login'
							className='px-4 py-2 bg-primary text-white rounded-md'
						>
							Login
						</Link>
					)}
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
						<div className='flex flex-col items-start px-4 py-4 space-y-2'>
							{navItems.map((item, index) => (
								<div key={item.name} className='w-full'>
									<Link
										href={item.href}
										className={`w-full px-4 py-4  ${
											pathname === item.href
												? 'border-primary text-primary'
												: 'border-transparent hover:border-primary hover:text-primary'
										}`}
									>
										{item.name}
									</Link>

									{/* Submenu for Mobile */}
									{item.submenu &&
										activeDropdown === index && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.3 }}
												className='w-full bg-gray-100 rounded-md p-2'
											>
												{item.submenu.map(subitem => (
													<Link
														key={subitem.name}
														href={subitem.href}
														className={`block px-4 py-4 hover:bg-gray-200 ${
															pathname ===
															subitem.href
																? 'bg-gray-300'
																: ''
														}`}
													>
														{subitem.name}
													</Link>
												))}
											</motion.div>
										)}
								</div>
							))}

							{/* Action Buttons (Mobile) */}
							<Link
								href='/contact'
								className='w-full px-4 py-2 border-l-4 border-transparent hover:border-primary hover:text-primary'
							>
								Contact Us
							</Link>
							{token ? (
								<div className='w-full px-4 py-2 bg-primary text-white text-center'>
									User Profile
								</div>
							) : (
								<Link
									href='/login'
									className='w-full px-4 py-2 bg-primary text-white rounded-md text-center'
								>
									Login
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}
