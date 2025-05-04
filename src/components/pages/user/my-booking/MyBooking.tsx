import React from 'react'
import BookingTab from './BookingTab'

const MyBooking = () => {
	return (
		<>
			<BookingTab />
			<section className='w-full max-w-4xl bg-white p-4 mt-4 rounded-lg mx-auto'>
				<h1 className='text-2xl font-bold mb-4'>My Booking</h1>
			</section>
		</>
	)
}

export default MyBooking
