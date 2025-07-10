'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { CalendarDays, Clock } from 'lucide-react'
import Button from '@/components/form/Button'

interface VisaCardProps {
	id: string
	slug: string | number
	imageUrl?: string
	visaType?: string
	visaMode?: string
	entryType?: string
	processingTime?: string
	visaValidity?: string
	maxStay?: string
	visaFee?: string
	serviceCharge?: string
	country: string
}

const fallbackImage = '/images/placeholder.webp'

const VisaCard: React.FC<VisaCardProps> = ({
	id,
	slug,
	imageUrl = fallbackImage,
	visaType = 'Tourist Visa',
	visaMode = 'E-Visa',
	entryType = 'Single Entry',
	processingTime = 'N/A',
	visaValidity = 'N/A',
	maxStay = 'N/A',
	visaFee = '0',
	serviceCharge = '0',
	country
}) => {
	const [imgSrc, setImgSrc] = useState(imageUrl)

	return (
		<article
			role='group'
			aria-label={`Visa: ${visaType}`}
			className='rounded-xl min-w-72 max-w-sm border bg-white p-3 shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400'
			tabIndex={0}
		>
			<div className='relative h-48 w-full overflow-hidden rounded-lg'>
				<Image
					src={imgSrc}
					alt={`${country} ${visaType}`}
					fill
					className='object-cover'
					onError={() => setImgSrc(fallbackImage)}
					sizes='(max-width: 768px) 100vw, 33vw'
				/>
			</div>

			<div className='mt-4 space-y-2'>
				<h3 className='text-lg font-semibold leading-tight text-gray-800'>
					{country} {visaType}
				</h3>

				<p className='text-sm text-gray-500'>
					{visaMode} — {entryType}
				</p>

				<div className='flex items-center justify-between text-sm text-gray-600 mt-2'>
					<div className='flex items-center gap-1'>
						<CalendarDays className='h-4 w-4' />
						<span>{processingTime}</span>
					</div>
					<div className='flex items-center gap-1'>
						<Clock className='h-4 w-4' />
						<span>{visaValidity}</span>
					</div>
				</div>

				<div className='text-sm text-gray-600'>
					Max Stay: <span className='font-medium'>{maxStay}</span>
				</div>

				<div className='mt-4'>
					<div className='flex items-center justify-between'>
						<span className='text-xl font-bold text-black'>
							Visa Fee: BDT {visaFee}
						</span>
						<span className='text-sm text-gray-500'>
							+ Service charge: BDT {serviceCharge}
						</span>
					</div>

					<Link href={`/visa/${slug}/${id}`}>
						<Button
							className='mt-3 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400'
							aria-label={`View details for ${visaType} visa`}
						>
							View Details
						</Button>
					</Link>
				</div>
			</div>
		</article>
	)
}

export default VisaCard
