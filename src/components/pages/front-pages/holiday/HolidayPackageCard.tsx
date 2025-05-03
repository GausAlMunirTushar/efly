'use client'

import {
	Camera,
	CreditCard,
	Hotel,
	MapPin,
	Plane,
	Utensils
} from 'lucide-react'
import Image from 'next/image'
import { FC, ReactNode, useState } from 'react'

interface HolidayPackageCardProps {
	imageUrl?: string
	title: string
	description?: string
	location: string
	nightsInfo: string
	price: number
	tags: string[]
	buttonText?: string
}

const iconMapper: { [key: string]: ReactNode } = {
	Hotel: <Hotel size={14} />,
	Transfer: <Plane size={14} />,
	Meals: <Utensils size={14} />,
	Visa: <CreditCard size={14} />,
	Tour: <Camera size={14} />
}

const fallbackImage = '/images/fallback.jpg' // Replace with your own fallback image path

const HolidayPackageCard: FC<HolidayPackageCardProps> = ({
	imageUrl,
	title,
	description,
	location,
	nightsInfo,
	price,
	tags,
	buttonText = 'Book Now'
}) => {
	const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImage)

	return (
		<div className='border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-white flex flex-col h-[500px]'>
			<div className='relative h-48 w-full'>
				<Image
					src={imgSrc}
					alt={title}
					fill
					className='object-cover'
					onError={() => setImgSrc(fallbackImage)}
				/>
			</div>

			<div className='px-4 py-6 flex flex-col gap-2 flex-grow'>
				<div className='flex flex-wrap gap-2'>
					{tags.map(tag => {
						const icon = iconMapper[tag]
						return (
							<div
								key={tag}
								className='flex items-center gap-1 text-xs bg-blue-100 text-blue-600 border border-gray-400 px-3 font-semibold py-1 rounded-lg'
							>
								{icon}
								<span>{tag}</span>
							</div>
						)
					})}
				</div>

				<h2 className='text-base font-semibold line-clamp-2'>
					{title}
				</h2>

				{description && (
					<p className='text-xs text-gray-500 line-clamp-3'>
						{description}
					</p>
				)}

				<div className='text-sm py-3 flex items-center gap-1 text-gray-600 mt-1'>
					<MapPin />
					<span>{location}</span>
				</div>

				<div className='mt-auto flex justify-between items-center pt-2'>
					<div className='text-primary font-bold text-lg'>
						BDT {price.toLocaleString()}
					</div>
				</div>

				<button className='bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded mt-2'>
					{buttonText}
				</button>
			</div>
		</div>
	)
}

export default HolidayPackageCard
