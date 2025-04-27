// components/TourPackageCard.tsx

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
import { FC, ReactNode } from 'react'

interface HolidayPackageCardProps {
	imageUrl: string
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
	return (
		<div className='border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-white'>
			<div className='relative h-48 w-full'>
				<Image
					src={imageUrl}
					alt={title}
					fill
					className='object-cover'
				/>
			</div>
			<div className='p-4 flex flex-col gap-2'>
				<div className='flex flex-wrap gap-2'>
					{tags.map(tag => {
						const icon = iconMapper[tag]
						return (
							<div
								key={tag}
								className='flex items-center gap-1 text-xs bg-blue-100 text-blue-600 border border-gray-400 px-3 font-semibold py-1 rounded-lg'
							>
								{typeof icon === 'string' ? (
									<Image
										src={icon}
										alt={tag}
										width={14}
										height={14}
									/>
								) : (
									icon
								)}
								<span>{tag}</span>
							</div>
						)
					})}
				</div>

				<h2 className='text-base font-semibold line-clamp-2'>
					{title}
				</h2>
				{description && (
					<p className='text-xs text-gray-500'>{description}</p>
				)}

				<div className='text-sm flex items-center gap-1 text-gray-600 mt-1'>
					<MapPin />
					<span> {location}</span> <span>{nightsInfo}</span>
				</div>

				<div className='mt-3 flex justify-between items-center'>
					<div className='text-primary font-bold text-lg'>
						BDT {price.toLocaleString()}
					</div>
					<button className='bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded'>
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	)
}

export default HolidayPackageCard
