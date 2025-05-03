'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import {
	Component,
	ListChecks,
	LayoutList,
	Wallet,
	BookUser,
	Settings
} from 'lucide-react'

interface MenuItem {
	title: string
	href?: string
	icon?: React.ReactNode
}

const menuItems: MenuItem[] = [
	{
		title: 'My Account',
		icon: <BookUser className='w-5 h-5' />,
		href: `/my-account`
	},
	{
		title: 'My Booking',
		icon: <ListChecks className='w-5 h-5' />,
		href: `/my-booking`
	},
	{
		title: 'Wishlist',
		icon: <LayoutList className='w-5 h-5' />,
		href: `/wishlist`
	},
	{
		title: 'Add Deposit',
		icon: <Wallet className='w-5 h-5' />,
		href: `/deposit`
	},
	{
		title: 'Change Password',
		icon: <Settings className='w-5 h-5' />,
		href: `/change-password`
	}
]

export default function UserSidebar() {
	const pathname = usePathname()
	const role = Cookies.get('role') || 'user'

	const filteredMenuItems = menuItems.filter(item => {
		if (role === 'editor') return item.title === 'Blog'
		return true
	})

	return (
		<aside className='w-60 bg-white dark:bg-bg_dark border-r dark:border-bg_secondary border-gray-200 shadow-md flex flex-col rounded-lg overflow-y-auto scrollbar-none'>
			<nav className='space-y-1 p-2'>
				{filteredMenuItems.map(item => (
					<Link
						key={item.title}
						href={item.href!}
						className={`flex items-center gap-2 p-2 rounded-md transition-all duration-300 hover:bg-primary dark:hover:bg-bg_secondary hover:text-white text-gray-600 dark:text-text-primary font-semibold ${
							pathname === item.href
								? 'bg-primary text-white dark:text-text-primary'
								: ''
						}`}
					>
						{item.icon}
						<span>{item.title}</span>
					</Link>
				))}
			</nav>
		</aside>
	)
}
