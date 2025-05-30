import { Umrah } from '@/components/pages/front-pages/umrah/Umrah'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
	title: `Umrah Package From Bangladesh ${new Date().getFullYear()}`,
	description: 'Umrah'
}

const UmrahPage = () => {
	return (
		<main>
			{/* Smaller height responsive image */}
			<section className='w-full relative h-[20vh] sm:h-[25vh] md:h-[30vh] lg:h-[35vh] xl:h-[40vh]'>
				<Image
					src='/images/umrah/umrah.jpg'
					alt='Umrah Banner'
					fill
					style={{ objectFit: 'cover' }}
					priority
					sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw'
				/>

				<div className='absolute inset-0 bg-black bg-opacity-40'></div>
				<div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent'></div>

				<h1 className='absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold z-10 px-4 text-center'>
					Umrah
				</h1>
			</section>

			{/* Content container below image */}
			<section className='container mx-auto py-10'>
				<Umrah />
			</section>
		</main>
	)
}

export default UmrahPage
