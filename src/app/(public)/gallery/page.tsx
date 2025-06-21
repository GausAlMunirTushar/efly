import GalleryGrid from '@/components/pages/front-pages/gallery/GalleryGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Gallery | efly Travel',
	description:
		'Explore our recent Umrah, Hajj and travel experiences in this photo gallery.'
}

const GalleryPage = () => {
	return (
		<main className='py-12 bg-gray-50 min-h-screen'>
			<div className='max-w-7xl mx-auto text-center px-4'>
				<h1 className='text-3xl font-bold text-gray-800 mb-4'>
					efly Gallery
				</h1>
				<p className='text-gray-600 mb-10 max-w-2xl mx-auto'>
					A collection of our recent trips, pilgrim experiences, and
					travel highlights.
				</p>
				<GalleryGrid />
			</div>
		</main>
	)
}

export default GalleryPage
