'use client'

import { galleryImages } from '@/data/galleryData'
import GalleryItem from './GalleryItem'

const GalleryGrid = () => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-6'>
			{galleryImages.map(item => (
				<GalleryItem
					key={item.id}
					title={item.title}
					description={item.description}
					imageUrl={item.imageUrl}
				/>
			))}
		</div>
	)
}

export default GalleryGrid
