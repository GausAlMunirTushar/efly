'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Clock } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/form/Button'

interface UmrahCardProps {
	id: string
	imageUrl: string
	discount?: string
	packagename: string
	description: string
	duration: string
	price: string
}

const fallbackImage = '/images/placeholder.webp'

const UmrahCard: React.FC<UmrahCardProps> = ({
	id,
	imageUrl,
	discount,
	packagename,
	description,
	duration,
	price
}) => {
	const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImage)

	return (
		<article
			role='group'
			aria-label={`Umrah package: ${packagename}`}
			className='rounded-xl max-w-72 border bg-white shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-50'
			tabIndex={0}
		>
			<div className='relative h-48 w-full overflow-hidden rounded-t-lg'>
				<Image
					src={imgSrc || fallbackImage}
					alt={packagename || 'Umrah package image'}
					fill
					className='object-cover'
					onError={() => setImgSrc(fallbackImage)}
					sizes='(max-width: 768px) 100vw, 33vw'
				/>
				{/* <span className='absolute top-2 right-2 rounded bg-blue-700 px-2 py-1 text-sm font-semibold text-white'>
					{discount} OFF
				</span> */}
			</div>

			<div className='mt-2 space-y-2 p-3 '>
				<h3 className='text-md font-semibold leading-tight text-gray-800 line-clamp-1'>
					{packagename}
				</h3>
				<div className='flex items-center justify-between text-sm text-gray-600 mt-2'>
					<div className='flex items-center gap-1'>
						<CalendarDays className='h-4 w-4' />
						<span>Anytime</span>
					</div>
					<div className='flex items-center gap-1'>
						<Clock className='h-4 w-4' />
						<span>{duration}</span>
					</div>
				</div>

				<div className='mt-2 flex items-baseline gap-2'>
					<span className='text-sm text-blue-400 '>BDT {price}</span>
				</div>

				<Link href={`/umrah/${id}`} passHref legacyBehavior>
					<Button
						className='mt-3 block w-full rounded bg-[#0058a8] px-4 py-2 text-center text-white hover:bg-[#0058a8] transition focus:outline-none focus:ring-2 focus:ring-blue-400'
						aria-label={`View details for ${packagename}`}
					>
						View Details
					</Button>
				</Link>
			</div>
		</article>
	)
}

export default UmrahCard
