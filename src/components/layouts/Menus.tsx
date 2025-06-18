'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plane, Umbrella, Landmark, BookOpen } from 'lucide-react'

const menuItems = [
	{ label: 'Flight', icon: <Plane size={15} />, href: '/flight' },
	{ label: 'Holiday', icon: <Umbrella size={15} />, href: '/holiday' },
	{ label: 'Visa', icon: <Landmark size={15} />, href: '/visa' },
	{ label: 'Umrah', icon: <BookOpen size={15} />, href: '/umrah' }
]

export default function Menus() {
	const pathname = usePathname()
	const containerRef = useRef<HTMLDivElement>(null)
	const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})
	const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 })
	const [hovered, setHovered] = useState<string | null>(null)

	// Update underline on hover or active path
	useLayoutEffect(() => {
		const activeKey =
			hovered || menuItems.find(item => item.href === pathname)?.label
		const ref = activeKey ? itemRefs.current[activeKey] : null

		if (ref && containerRef.current) {
			const rect = ref.getBoundingClientRect()
			const containerRect = containerRef.current.getBoundingClientRect()
			setUnderlineProps({
				left: rect.left - containerRect.left,
				width: rect.width
			})
		}
	}, [hovered, pathname])

	return (
		<div ref={containerRef} className='relative flex gap-10 pb-2'>
			{/* Sliding underline for active/hovered item */}
			<motion.div
				className='absolute bottom-0 h-[2px] bg-[#0058a8] rounded-full'
				animate={{
					left: underlineProps.left,
					width: underlineProps.width
				}}
				transition={{ type: 'spring', stiffness: 500, damping: 30 }}
			/>

			{menuItems.map(item => {
				const isActive = pathname === item.href

				return (
					<div
						key={item.label}
						ref={el => {
							itemRefs.current[item.label] = el
						}}
						onMouseEnter={() => setHovered(item.label)}
						onMouseLeave={() => setHovered(null)}
						className='relative flex flex-col items-center text-sm cursor-pointer'
					>
						<Link
							href={item.href}
							className={`flex flex-col items-center transition-colors duration-300 ${
								isActive
									? 'text-black font-semibold'
									: 'text-gray-600 hover:text-[#0058a8]'
							}`}
						>
							{item.icon}
							<span className='mt-0.5 text-xs'>{item.label}</span>
						</Link>
					</div>
				)
			})}
		</div>
	)
}
