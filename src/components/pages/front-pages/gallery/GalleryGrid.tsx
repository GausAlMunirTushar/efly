'use client'

import { useEffect, useState } from 'react'
import GalleryItem from './GalleryItem'

type Gallery = {
	_id: string
	title: string
	description: string
	galleryImage: string
}

const GalleryGrid = () => {
	const [galleryImages, setGalleryImages] = useState<Gallery[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchGallery = async () => {
			try {
				const res = await fetch('/api/gallery')
				if (!res.ok) throw new Error('Failed to fetch gallery data')
				const data = await res.json()
				setGalleryImages(data)
			} catch (err) {
				setError((err as Error).message)
			} finally {
				setLoading(false)
			}
		}

		fetchGallery()
	}, [])

	if (loading) return <p>Loading gallery...</p>
	if (error) return <p className='text-red-500'>Error: {error}</p>

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-6'>
			{galleryImages.map(item => (
				<GalleryItem
					key={item._id}
					title={item.title}
					description={item.description}
					imageUrl={item.galleryImage}
				/>
			))}
		</div>
	)
}

export default GalleryGrid
