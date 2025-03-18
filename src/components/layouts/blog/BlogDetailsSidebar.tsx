'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SkeletonLoader from '@/components/common/SkeletonLoader'

interface Category {
	_id: string
	name: string
	slug: string
	blogCount: number
}

export default function BlogDetailsSidebar() {
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState(true)
	const pathname = usePathname()

	useEffect(() => {
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
	}, [])

	return (
		<aside className='w-full  bg-gray-100 px-4 py-2 rounded-lg'>
			<h2 className='text-lg text-gray-700 font-bold mb-2'>Categories</h2>
			{loading ? (
				<SkeletonLoader type='category' />
			) : (
				<ul>
					<li
						className={`cursor-pointer p-1.5 px-4 rounded ${
							pathname === '/blog'
								? 'bg-primary text-white'
								: 'border border-primary hover:bg-primary hover:text-white transition-colors duration-300'
						}`}
					>
						<Link href='/blog' className='w-full h-full block'>
							All (
							{categories.reduce(
								(total, category) => total + category.blogCount,
								0
							)}
							)
						</Link>
					</li>

					{categories.map(category => (
						<li
							key={category._id}
							className={`cursor-pointer p-1.5 px-3 rounded my-2 ${
								pathname === `/blog/${category.slug}`
									? 'bg-primary text-white'
									: 'border border-primary hover:bg-primary hover:text-white transition-colors duration-300'
							}`}
						>
							<Link
								href={`/blog/${category.slug}`}
								className='w-full h-full block'
							>
								{category.name} ({category.blogCount ?? 0})
							</Link>
						</li>
					))}
				</ul>
			)}
		</aside>
	)
}
