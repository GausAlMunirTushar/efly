'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	User,
	Settings,
	DollarSign,
	HelpCircle,
	LogOut,
	CalendarDays,
	LockKeyhole
} from 'lucide-react'
import Image from 'next/image'
import Modal from '@/components/common/Modal'
import MyProfile from '@/components/pages/user/my-profile/MyProfile'
import Link from 'next/link'

const UserProfileDropdown = ({ onClose }: { onClose: () => void }) => {
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const router = useRouter()

	const handleLogout = async () => {
		try {
			await fetch('/api/auth/logout', { method: 'POST' })
			onClose() //
			router.push('/')
		} catch (error) {
			console.error('Logout failed:', error)
		}
	}

	return (
		<div className='absolute right-0 mt-5 w-56 bg-white dark:text-text-primary dark:bg-bg_dark  shadow-lg rounded-lg border dark:border-bg_dark p-3 z-50'>
			{/* Profile Info */}
			<div className='flex items-center gap-3 border-b dark:border-bg_secondary dark:bg-bg_dark  pb-2'>
				<Image
					src='/images/tushar.jpg'
					alt='Profile'
					width={40}
					height={40}
					className='rounded-full border border-gray-300 dark:border-bg_dark'
				/>
				<div>
					<p className='text-sm font-semibold text-gray-500 dark:text-text-primary'>
						Tushar
					</p>
					<p className='text-xs text-gray-500'>admin@admin.com</p>
				</div>
			</div>

			{/* Menu Items */}
			<ul className='mt-2 space-y-2 text-gray-700'>
				<Link
					href='/my-account'
					className='flex items-center gap-2 p-2 hover:bg-gray-100 hover:dark:bg-bg_secondary dark:text-text-primary rounded cursor-pointer'
				>
					<User className='h-5 w-5' /> My Account
				</Link>
				<Link
					href='/my-booking'
					className='flex items-center gap-2 p-2 hover:bg-gray-100 hover:dark:bg-bg_secondary dark:text-text-primary rounded cursor-pointer'
				>
					<CalendarDays className='h-5 w-5' /> My Booking
				</Link>
				<Link
					href='/change-password'
					className='flex items-center gap-2 p-2 hover:bg-gray-100 hover:dark:bg-bg_secondary dark:text-text-primary  rounded cursor-pointer'
				>
					<LockKeyhole className='h-5 w-5' /> Change Passsword
				</Link>

				<li
					className='flex items-center gap-2 p-2 hover:bg-gray-100 hover:dark:bg-bg_secondary dark:text-text-primary rounded cursor-pointer'
					onClick={onClose}
				>
					<HelpCircle className='h-5 w-5' /> FAQ
				</li>
			</ul>

			{/* Logout */}
			<button
				className='mt-2 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600'
				onClick={handleLogout}
			>
				<LogOut className='h-5 w-5' /> Logout
			</button>

			{/* MyProfile Modal */}
			{isProfileOpen && (
				<Modal
					title='My Profile'
					isOpen={isProfileOpen}
					onClose={() => setIsProfileOpen(false)}
				>
					<MyProfile />
				</Modal>
			)}
		</div>
	)
}

export default UserProfileDropdown
