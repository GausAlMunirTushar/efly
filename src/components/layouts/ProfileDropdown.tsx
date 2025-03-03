'use client'

import { useState } from 'react'
import { User, Settings, DollarSign, HelpCircle, LogOut } from 'lucide-react'
import Image from 'next/image'
import Modal from '@/components/common/Modal'
import MyProfile from '@/components/pages/user/my-profile/MyProfile'

const ProfileDropdown = ({ onClose }: { onClose: () => void }) => {
	const [isProfileOpen, setIsProfileOpen] = useState(false)
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
				<li
					className='flex items-center gap-2 p-2 hover:bg-gray-100 hover:dark:bg-bg_secondary dark:text-text-primary rounded cursor-pointer'
					onClick={() => setIsProfileOpen(true)}
				>
					<User className='h-5 w-5' /> My Profile
				</li>
				<li
					className='flex items-center gap-2 p-2 hover:bg-gray-100 hover:dark:bg-bg_secondary dark:text-text-primary  rounded cursor-pointer'
					onClick={onClose}
				>
					<Settings className='h-5 w-5' /> Settings
				</li>
				<li
					className='flex items-center gap-2 p-2 hover:bg-gray-100 hover:dark:bg-bg_secondary dark:text-text-primary rounded cursor-pointer'
					onClick={onClose}
				>
					<DollarSign className='h-5 w-5' /> Pricing
				</li>
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
				onClick={onClose}
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

export default ProfileDropdown
