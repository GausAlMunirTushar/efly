'use client'

import { useEffect, useState } from 'react'
import UmrahCard from './UmrahCard'
import { getAllUmrah } from '@/services/umrahService'

interface UmrahPackageFromDB {
	_id: string
	packagename: string
	description?: string
	price: number
	duration?: string
	images?: string[]
	includedServices?: string[]
	isFeatured?: boolean
	termsAndConditions?: string
	refundAndReissuePolicy?: string
	pricingDetails?: string
	createdAt?: string
	updatedAt?: string
}

export const Umrah = () => {
	const [umrahPackages, setUmrahPackages] = useState<UmrahPackageFromDB[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const data: UmrahPackageFromDB[] = await getAllUmrah()
				setUmrahPackages(data)
			} catch (err: any) {
				setError(err.message || 'Unknown error')
			} finally {
				setLoading(false)
			}
		}
		fetchPackages()
	}, [])

	if (error) return <p className='text-red-600'>Error: {error}</p>

	return (
		<section
			className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-10 gap-y-12 py-10 bg-white'
			aria-labelledby='umrah-heading'
		>
			{umrahPackages.map(pkg => {
				const cardProps = {
					id: pkg._id,
					imageUrl:
						pkg.images && pkg.images.length > 0
							? pkg.images[0]
							: '/images/placeholder.webp',
					discount: undefined,
					packagename: pkg.packagename,
					description: pkg.description || '',
					duration: pkg.duration || 'N/A',
					price: `$${pkg.price.toFixed(2)}`
				}
				return (
					<div key={pkg._id}>
						<UmrahCard {...cardProps} />
					</div>
				)
			})}
		</section>
	)
}
