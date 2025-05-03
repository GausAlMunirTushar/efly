'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import {
	ListChecks,
	LayoutList,
	Wallet,
	BookUser,
	LockKeyhole,
	Headset,
	Component,
	CalendarDays
} from 'lucide-react'

interface MenuItem {
	title: string
	href?: string
	icon?: React.ReactNode
}

const menuItems: MenuItem[] = [
	{
		title: 'My Account',
		icon: <Component className='w-5 h-5' />,
		href: `/my-account`
	},
	{
		title: 'My Booking',
		icon: <CalendarDays className='w-5 h-5' />,
		href: `/my-booking`
	},
	{
		title: 'Change Password',
		icon: <LockKeyhole className='w-5 h-5' />,
		href: `/change-password`
	},
	{
		title: 'Support',
		icon: <Headset className='w-5 h-5' />,
		href: `/support`
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
			<nav className='space-y-1 py-5'>
				{filteredMenuItems.map(item => (
					<Link
						key={item.title}
						href={item.href!}
						className={`flex items-center gap-2 px-5 py-2.5  transition-all duration-300 hover:text-primary dark:hover:bg-bg_secondary  text-gray-600 dark:text-text-primary font-semibold ${
							pathname === item.href
								? 'border-l-4 border-primary bg-blue-100 text-primary'
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
