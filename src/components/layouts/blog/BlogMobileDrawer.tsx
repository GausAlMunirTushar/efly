'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import SkeletonLoader from '@/components/common/SkeletonLoader'

interface Category {
	_id: string
	name: string
	slug: string
	blogCount: number
}

export default function BlogMobileDrawer({
	isOpen,
	onClose
}: {
	isOpen: boolean
	onClose: () => void
}) {
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState(true)
	const pathname = usePathname()

	useEffect(() => {
		if (!isOpen) return

		const fetchCategories = async () => {
			try {
				const res = await fetch('/api/categories')
				if (!res.ok) throw new Error('Failed to fetch categories')
				const data = await res.json()
				setCategories(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}
		fetchCategories()
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 z-50'>
			<div className='fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-50 p-4'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-lg font-bold'>Categories</h2>
					<button onClick={onClose}>
						<X />
					</button>
				</div>

				{loading ? (
					<SkeletonLoader type='category' />
				) : (
					<ul>
						<li
							className={`cursor-pointer p-2 px-4 rounded ${
								pathname === '/blog'
									? 'bg-primary text-white'
									: 'border border-primary hover:bg-primary hover:text-white transition-colors duration-300'
							}`}
						>
							<Link href='/blog' onClick={onClose}>
								All (
								{categories.reduce(
									(total, category) =>
										total + category.blogCount,
									0
								)}
								)
							</Link>
						</li>

						{categories.map(category => (
							<li
								key={category._id}
								className={`cursor-pointer p-2 px-4 rounded my-2 ${
									pathname === `/blog/${category.slug}`
										? 'bg-primary text-white'
										: 'border border-primary hover:bg-primary hover:text-white transition-colors duration-300'
								}`}
							>
								<Link
									href={`/blog/${category.slug}`}
									onClick={onClose}
								>
									{category.name} ({category.blogCount ?? 0})
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}
