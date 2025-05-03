'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import {
	Component,
	CalendarDays,
	LockKeyhole,
	Headset,
	LogOut
} from 'lucide-react'

interface MenuItem {
	title: string
	href?: string
	icon: React.ReactNode
}

const menuItems: MenuItem[] = [
	{
		title: 'My Account',
		icon: <Component className='w-5 h-5' />,
		href: `/my-account`
	},
	{
		title: 'My Bookings',
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
	},
	{
		title: 'Logout',
		icon: <LogOut className='w-5 h-5' />,
		href: `/logout`
	}
]

export default function UserMobileMenu() {
	const pathname = usePathname()
	const role = Cookies.get('role') || 'user'

	const filteredItems = menuItems.filter(item => {
		if (role === 'editor') return item.title === 'Blog'
		return true
	})

	return (
		<div className='max-w-4xl md:hidden mx-4 bg-white rounded-xl shadow-sm p-2 flex items-center justify-between overflow-x-auto text-xs'>
			{filteredItems.map(item => {
				const isActive = pathname === item.href
				return (
					<Link
						key={item.title}
						href={item.href!}
						className={`flex flex-col items-center justify-center px-3 py-2 text-center whitespace-nowrap rounded-lg transition-all duration-200 ${
							isActive
								? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
								: 'text-gray-500 hover:text-blue-500'
						}`}
					>
						{item.icon}
						<span className='text-[12px] mt-1'>{item.title}</span>
					</Link>
				)
			})}
		</div>
	)
}
