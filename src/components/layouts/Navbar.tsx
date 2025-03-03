'use client'

import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import SearchModal from '@/components/common/SearchModal'
import ThemeSwitcher from '@/components/common/ThemeSwitcher'
import Notifications from '@/components/common/Notifications'
import ProfileDropdown from '@/components/layouts/ProfileDropdown'

const Navbar = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [searchOpen, setSearchOpen] = useState(false)
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

	// Open search modal when pressing Ctrl + K or ⌘ + K
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
				event.preventDefault() // Prevent default browser behavior
				setSearchOpen(true)
			}
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	return (
		<nav className='flex items-center justify-between px-4 py-3 bg-white dark:bg-bg_dark rounded-lg box-shadow'>
			{/* Search Bar */}
			<div
				onClick={() => setSearchOpen(true)}
				className='flex items-center cursor-pointer gap-2 dark:bg-bg_dark px-4 py-2 rounded-full w-full max-w-md'
			>
				<Search className='h-5 w-5 text-gray-500' />
				<input
					type='text'
					placeholder='Search ⌘K'
					readOnly
					className='bg-transparent placeholder:text-gray-300 placeholder:text-md cursor-pointer outline-none w-full text-gray-700'
				/>
			</div>

			{/* Icons and Profile */}
			<div className='flex items-center gap-6'>
				{/* Theme Switcher Component */}
				<ThemeSwitcher />
				{/* Notifications */}
				<Notifications />

				{/* Profile Picture & Dropdown */}
				<div className='relative' ref={dropdownRef}>
					<Image
						src='/images/tushar.jpg'
						alt='Profile'
						width={32}
						height={32}
						className='rounded-full border h-8 w-8 border-gray-300 cursor-pointer'
						onClick={() => setDropdownOpen(!dropdownOpen)}
					/>

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
								<ProfileDropdown
									onClose={() => setDropdownOpen(false)}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Search Modal */}
			<SearchModal
				isOpen={searchOpen}
				onClose={() => setSearchOpen(false)}
			/>
		</nav>
	)
}

export default Navbar
