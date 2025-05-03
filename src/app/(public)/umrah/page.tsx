import { Umrah } from '@/components/pages/front-pages/umrah/Umrah'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Umrah Package From Bangladesh ${new Date().getFullYear()}`,
	description: 'Umrah'
}

const UmrahPage = () => {
	return (
		<section className='container mx-auto'>
			<h1 className='text-3xl font-bold text-center py-10'>
				Umrah Packages
			</h1>
			<Umrah />
		</section>
	)
}

export default UmrahPage
