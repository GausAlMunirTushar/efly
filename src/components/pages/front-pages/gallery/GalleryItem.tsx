'use client'

import Image from 'next/image'

interface GalleryItemProps {
	title: string
	description: string
	imageUrl: string
}

const GalleryItem: React.FC<GalleryItemProps> = ({
	title,
	description,
	imageUrl
}) => {
	return (
		<div className='group relative overflow-hidden rounded-xl shadow hover:shadow-lg transition'>
			<Image
				src={imageUrl}
				alt={title}
				width={400}
				height={300}
				className='h-60 w-full object-cover transition group-hover:scale-105'
			/>
			<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end'>
				<h3 className='text-white text-lg font-semibold'>{title}</h3>
				<p className='text-white text-sm'>{description}</p>
			</div>
		</div>
	)
}

export default GalleryItem
