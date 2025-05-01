'use client'

import Image from 'next/image'
import { CalendarDays, Clock } from 'lucide-react'

interface UmrahCardProps {
	imageUrl: string
	discount: string
	title: string
	description: string
	duration: string
	oldPrice: string
	newPrice: string
}

const UmrahCard: React.FC<UmrahCardProps> = ({
	imageUrl,
	discount,
	title,
	description,
	duration,
	oldPrice,
	newPrice
}) => {
	return (
		<div className='rounded-xl border bg-white p-3 shadow-md hover:shadow-lg transition'>
			<div className='relative h-48 w-full overflow-hidden rounded-lg'>
				<Image
					src={imageUrl}
					alt={title}
					fill
					className='object-cover'
				/>
				<span className='absolute top-2 right-2 rounded bg-blue-700 px-2 py-1 text-sm font-semibold text-white'>
					{discount} OFF
				</span>
			</div>

			<div className='mt-4 space-y-2'>
				<h2 className='text-lg font-semibold leading-tight text-gray-800 line-clamp-1'>
					{title}
				</h2>
				<p className='text-sm text-gray-500 line-clamp-2'>
					{description}
				</p>

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
					<span className='text-sm text-gray-400 line-through'>
						{oldPrice}
					</span>
					<span className='text-lg font-bold text-black'>
						{newPrice}
					</span>
				</div>

				<button className='mt-3 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition'>
					View Details
				</button>
			</div>
		</div>
	)
}

export default UmrahCard
