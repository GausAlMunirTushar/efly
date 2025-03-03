'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
	Circle,
	CircleDot,
	Banknote,
	Component,
	ChevronDown,
	ChevronRight
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
		href: `/dashboard`
	},
	{
		title: 'Accounting',
		icon: <Banknote className='w-5 h-5' />,
		subMenu: [
			{ title: 'Account List', href: `/account-list` },
			{ title: 'Create New Account', href: `/create-new-account` },
			{ title: 'Account Group', href: `/account-group` }
		]
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

	const toggleSidebar = () => {
		setIsPersistent(!isPersistent)
		setIsExpanded(!isPersistent)
	}

	const toggleSubMenu = (title: string) => {
		setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }))
	}

	return (
		<motion.aside
			className='relative min-h-screen bg-white dark:bg-bg_dark border-r border-gray-200 dark:border-dark:bg-bg_dark shadow-md flex flex-col transition-all duration-300'
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
				{/* <Image
					src='/images/orbit_logo.svg'
					alt='Logo'
					width={32}
					height={32}
					className='w-14'
				/> */}
				<Image
					alt='logo'
					width={32}
					height={32}
					src='/images/orbit_logo.png'
					className='w-16 dark:hidden'
				/>
				<Image
					alt='logo-dark'
					width={32}
					height={32}
					src='/images/orbit_dark_logo.png'
					className='w-14 py-2 pl-4 hidden dark:block'
				/>
				{isExpanded && (
					<span className='text-3xl font-semibold text-gray-700 dark:text-text-primary'>
						Finance
					</span>
				)}
			</div>

			{/* Navigation */}
			<nav className='space-y-1 p-2'>
				{menuItems.map(item => (
					<div key={item.title}>
						{item.href ? (
							<Link
								href={item.href}
								className={`flex items-center gap-2 p-2 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-bg_secondary  text-gray-500 dark:text-text-primary${
									pathname === item.href
										? 'bg-primary-500 text-white font-semibold'
										: ''
								}`}
							>
								{item.icon}
								{isExpanded && <span>{item.title}</span>}
							</Link>
						) : (
							<button
								onClick={() => toggleSubMenu(item.title)}
								className='flex justify-between items-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-bg_secondary text-gray-500 dark:text-text-primary'
							>
								<div className='flex items-center gap-2'>
									{item.icon}
									{isExpanded && <span>{item.title}</span>}
								</div>
								{/* Only show submenu toggle icons if sidebar is expanded */}
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
