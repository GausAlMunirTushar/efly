import GalleryGrid from '@/components/pages/front-pages/gallery/GalleryGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Gallery | bijoyair Travel',
	description:
		'Explore our recent Umrah, Hajj and travel experiences in this photo gallery.'
}

const GalleryPage = () => {
	return (
		<main className=''>
			<div className='flex items-center justify-center bg-[#0058A8] h-36'>
				<h1 className='text-2xl sm:text-4xl font-bold text-center text-white mb-6'>
					bijoyair Gallery
				</h1>
			</div>
			<div className='max-w-7xl mx-auto text-center px-4 py-8'>
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
