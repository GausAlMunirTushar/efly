'use client'

import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppButton = () => {
	const phoneNumber = '+8801400054666'
	const message = 'Hello! I would like to know more about your services.'

	const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

	return (
		<Link
			href={whatsappLink}
			target='_blank'
			rel='noopener noreferrer'
			className='fixed z-50 bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all'
		>
			<FaWhatsapp size={24} />
		</Link>
	)
}

export default WhatsAppButton
