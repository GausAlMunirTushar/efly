'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import {
	Circle,
	CircleDot,
	Banknote,
	Component,
	ChevronDown,
	ChevronRight,
	Rss,
	FileUser,
	TentTree,
	Images,
	University,
	BookOpenCheck,
	Settings,
	UserRoundSearchIcon,
	ListOrdered
} from 'lucide-react'
import Image from 'next/image'

interface MenuItem {
	title: string
	href?: string
	icon?: React.ReactNode
	subMenu?: MenuItem[]
}

const menuItems: MenuItem[] = [
	{
		title: 'Dashboard',
		icon: <Component className='w-5 h-5' />,
		href: `/admin/dashboard`
	},
	{
		title: 'Blog',
		icon: <Rss className='w-5 h-5' />,
		subMenu: [
			{ title: 'Category', href: `/admin/categories` },
			{ title: 'Blog', href: `/admin/blog` }
		]
	},
	{
		title: 'Jobs',
		icon: <FileUser className='w-5 h-5' />,
		href: `/admin/jobs`
	},
	{
		title: 'Customize',
		icon: <Banknote className='w-5 h-5' />,
		subMenu: [
			{ title: 'Contact', href: `/admin/contact` },
			{ title: 'About Us', href: `/admin/about` },
			{ title: 'FAQ', href: `/admin/faq` },
			{ title: 'Home Slide', href: `/admin/home-slide` },
			{ title: 'Blog Slide', href: `/admin/blog-slide` }
		]
	},
	{
		title: 'Visa',
		icon: <BookOpenCheck className='w-5 h-5' />,
		href: `/admin/visa`
	},
	{
		title: 'Umrah',
		icon: <University className='w-5 h-5' />,
		href: `/admin/umrah`
	},
	{
		title: 'Gallery',
		icon: <Images className='w-5 h-5' />,
		href: `/admin/gallery`
	},
	{
		title: 'Events',
		icon: <Images className='w-5 h-5' />,
		href: `/admin/events`
	},
	{
		title: 'Holiday',
		icon: <TentTree className='w-5 h-5' />,
		href: `/admin/holiday`
	},
	{
		title: 'Orders',
		icon: <ListOrdered className='w-5 h-5' />,
		href: `/admin/orders`
	},
	{
		title: 'Customers',
		icon: <UserRoundSearchIcon className='w-5 h-5' />,
		href: `/admin/customers`
	},
	{
		title: 'Settings',
		icon: <Settings className='w-5 h-5' />,
		href: `/admin/settings`
	}
]

interface SidebarProps {
	isExpanded: boolean
	setIsExpanded: (value: boolean) => void
}

export default function Sidebar({ isExpanded, setIsExpanded }: SidebarProps) {
	const pathname = usePathname()
	const [isPersistent, setIsPersistent] = useState(false)
	const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})
	const [role, setRole] = useState<string | null>(null)

	useEffect(() => {
		const userRole = Cookies.get('role') || 'user'
		setRole(userRole)
	}, [])

	const toggleSidebar = () => {
		setIsPersistent(!isPersistent)
		setIsExpanded(!isPersistent)
	}

	const toggleSubMenu = (title: string) => {
		setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }))
	}

	const filteredMenuItems = menuItems.filter(item => {
		if (role === 'editor') {
			return item.title === 'Blog'
		}
		return true
	})

	return (
		<motion.aside
			className='relative min-h-screen bg-white dark:bg-bg_dark border-r dark:border-bg_secondary border-gray-200 dark:border-dark:bg-bg_dark shadow-md flex flex-col transition-all duration-300'
			initial={{ width: '4rem' }}
			animate={{ width: isExpanded ? '15rem' : '4rem' }}
			transition={{ duration: 0.3 }}
			onMouseEnter={() => !isPersistent && setIsExpanded(true)}
			onMouseLeave={() => !isPersistent && setIsExpanded(false)}
		>
			{/* Toggle Button */}
			{isExpanded && (
				<button
					onClick={toggleSidebar}
					className='absolute right-4 top-5 bg-gray-100 text-gray-500 dark:text-text-primary dark:bg-bg_dark p-1 rounded-full shadow-md'
				>
					{isPersistent ? (
						<CircleDot className='w-5 h-5' />
					) : (
						<Circle className='w-5 h-5' />
					)}
				</button>
			)}

			{/* Logo */}
			<div className='flex items-center gap-1 my-2'>
				{isExpanded && (
					<Image
						src='/efly.png'
						alt='Logo'
						width={40}
						height={40}
						className='w-20 mx-4'
					/>
				)}
			</div>

			{/* Navigation */}
			<nav className='space-y-1 p-2'>
				{filteredMenuItems.map(item => (
					<div key={item.title}>
						{item.href ? (
							<Link
								href={item.href}
								className={`flex items-center gap-2 p-2 rounded-md transition-all duration-300 hover:bg-[#0058A8] dark:hover:bg-bg_secondary hover:text-white  text-gray-600 dark:text-text-primary font-semibold ${
									pathname === item.href
										? 'bg-[#0058A8] text-white dark:text-text-primary font-semibold'
										: ''
								}`}
							>
								{item.icon}
								{isExpanded && <span>{item.title}</span>}
							</Link>
						) : (
							<button
								onClick={() => toggleSubMenu(item.title)}
								className='flex justify-between items-center w-full p-2 rounded-md font-semibold dark:hover:bg-bg_secondary text-gray-500  dark:text-text-primary  hover:bg-[#0058A8]  hover:text-white'
							>
								<div className='flex items-center gap-2'>
									{item.icon}
									{isExpanded && <span>{item.title}</span>}
								</div>
								{isExpanded && (
									<motion.div
										animate={{
											rotate: openMenus[item.title]
												? 90
												: 0
										}}
										transition={{ duration: 0.3 }}
									>
										{openMenus[item.title] ? (
											<ChevronDown className='w-4 h-4' />
										) : (
											<ChevronRight className='w-4 h-4' />
										)}
									</motion.div>
								)}
							</button>
						)}

						{item.subMenu &&
							openMenus[item.title] &&
							isExpanded && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									transition={{ duration: 0.3 }}
									className='ml-4 mt-1 space-y-2'
								>
									{item.subMenu.map(subItem => (
										<Link
											key={subItem.title}
											href={subItem.href!}
											className='block p-2 rounded-md hover:bg-gray-100 text-gray-500 dark:text-text-primary dark:hover:bg-bg_secondary'
										>
											{subItem.title}
										</Link>
									))}
								</motion.div>
							)}
					</div>
				))}
			</nav>
		</motion.aside>
	)
}
