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
		<nav className='fixed bottom-2 left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-200 shadow-lg rounded-2xl px-3 py-2 flex items-center gap-1 md:gap-2 max-w-md overflow-x-auto backdrop-blur-md'>
			{navItems.map(({ name, href, icon: Icon }) => {
				const isActive = pathname === href

				return (
					<motion.div
						key={name}
						whileHover={{ scale: 1.15 }}
						whileTap={{ scale: 0.95 }}
						className='flex items-center justify-center'
					>
						<Link
							href={href}
							className={`group w-16 flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-colors duration-200 ${
								isActive
									? 'bg-primary text-white shadow-inner'
									: 'text-gray-600 hover:bg-primary/90 hover:text-white'
							}`}
						>
							<Icon className='w-5 h-5 mb-0.5' />
							<span className='text-[10px] font-medium'>
								{name}
							</span>
						</Link>
					</motion.div>
				)
			})}
		</nav>
	)
}
