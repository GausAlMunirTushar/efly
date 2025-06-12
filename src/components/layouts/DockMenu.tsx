'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Plane, Mountain, BadgeCheck, House } from 'lucide-react'

const navItems = [
	{ name: 'Home', href: '/', icon: Home },
	{ name: 'Flight', href: '/flight', icon: Plane },
	{ name: 'Holiday', href: '/holiday', icon: Mountain },
	{ name: 'Visa', href: '/visa', icon: BadgeCheck },
	{ name: 'Umrah', href: '/umrah', icon: House }
]

export default function DockMenu() {
	const pathname = usePathname()

	return (
		<nav
			className='fixed sm:hidden bottom-0 sm:bottom-2 left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-200 border-b-0 shadow-xl rounded-t-2xl sm:rounded-2xl px-2 py-2 flex flex-wrap items-center justify-center gap-1 md:gap-2 max-w-md w-full sm:w-auto overflow-x-auto backdrop-blur-md'
			aria-label='Main navigation'
		>
			{navItems.map(({ name, href, icon: Icon }) => {
				const isActive = pathname === href

				return (
					<motion.div
						key={name}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className='flex items-center justify-center'
					>
						<Link
							href={href}
							aria-current={isActive ? 'page' : undefined}
							aria-label={name}
							className={`group w-16 flex flex-col items-center justify-center px-3 py-2 rounded-xl focus:outline-none text-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-colors duration-200 ${
								isActive
									? 'bg-[#0058A8] text-white shadow-inner'
									: 'text-gray-600 hover:bg-primary/90 hover:text-white'
							}`}
						>
							<Icon
								className='w-5 h-5 mb-0.5'
								aria-hidden='true'
							/>
							<span className='text-[10px] font-medium '>
								{name}
							</span>
						</Link>
					</motion.div>
				)
			})}
		</nav>
	)
}
