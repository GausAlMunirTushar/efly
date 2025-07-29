'use client'

import { useEffect, useState } from 'react'
import Search from '@/components/pages/home/search/Search'
import { getVisas, Visa } from '@/services/visaService'

const VisaPage = () => {
	const [visas, setVisas] = useState<Visa[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchVisaData = async () => {
			try {
				const data = await getVisas()
				setVisas(data)
			} catch (error) {
				console.error('Error fetching visa data:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchVisaData()
	}, [])

	return (
		<main>
			<section
				className='bg-cover bg-center bg-no-repeat py-14'
				style={{ backgroundImage: "url('/images/visa/visa.jpg')" }}
			>
				<Search />
			</section>
		</main>
	)
}

export default VisaPage
