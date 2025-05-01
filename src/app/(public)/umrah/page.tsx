import { Umrah } from '@/components/pages/front-pages/umrah/Umrah'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Umrah Package From Bangladesh ${new Date().getFullYear()}`,
	description: 'Umrah'
}

const UmrahPage = () => {
	return (
		<section className='container mx-auto'>
			<Umrah />
		</section>
	)
}

export default UmrahPage
