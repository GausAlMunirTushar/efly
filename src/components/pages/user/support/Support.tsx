import React from 'react'
import ContactForm from './ContactForm'

export const metadata = {
	title: 'Support',
	description: 'Support page'
}
const Support = () => {
	return (
		<div className='w-full max-w-4xl bg-white p-4 rounded-lg mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Support</h1>
			<p className='text-gray-700'>
				If you have any questions or need assistance, please contact our
				support team
			</p>
			<ContactForm />
		</div>
	)
}

export default Support
