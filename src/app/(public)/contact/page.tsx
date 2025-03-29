'use client'

import Input from '@/components/form/Input'
import TextArea from '@/components/form/TextArea'
import React from 'react'
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

const ContactPage = () => {
	return (
		<section>
			<div className='flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 h-36'>
				<h1 className='text-4xl font-bold text-white'>Contact Us</h1>
			</div>
			<div className='container mx-auto p-6'>
				<div className='grid md:grid-cols-2 gap-6'>
					{/* Left Side - Contact Form */}
					<div className='bg-white shadow-md p-6 rounded-lg'>
						<p className='mb-4 text-gray-600'>
							Reach out to us via email or connect directly by
							phone. For a personalized touch, visit us in person
							and discuss your travel plans.
						</p>
						<form className='space-y-4 mt-14'>
							<Input
								type='text'
								placeholder='Name'
								className=''
							/>
							<Input
								type='email'
								placeholder='Email'
								className=''
							/>
							<TextArea
								placeholder='Message'
								rows={4}
								className='w-full p-2 border rounded-md'
							></TextArea>
							<button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'>
								Send Now
							</button>
						</form>
					</div>

					{/* Right Side - Map and Address */}
					<div className='shadow-md rounded-lg'>
						<iframe
							className='w-full h-60 rounded-lg mb-4'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9020684300725!2d90.3984!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x123456789abcdef!2sITS%20Holidays%20Ltd.!5e0!3m2!1sen!2sbd!4v1631234567890'
							allowFullScreen
							loading='lazy'
						></iframe>
						<div className=' p-4'>
							<h3 className='text-lg font-semibold'>Email:</h3>
							<p>efly@gmail.com</p>
							<h3 className='text-lg font-semibold mt-4'>
								📍 eFly Lounge (Dhaka):
							</h3>
							<p>
								Mohakhali DOHS, Rode-30, Hous-437, 3rd Floor,
								Dhaka 1206.
							</p>
						</div>
					</div>
				</div>

				{/* Contact Buttons */}
				{/* <div className='flex flex-col gap-4 mt-6'>
					<a
						href='tel:+8801901468550'
						className='flex items-center justify-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600'
					>
						<FaWhatsapp className='mr-2' /> +880 1901-468550
					</a>
					<a
						href='tel:+8801901468559'
						className='flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'
					>
						<FaPhoneAlt className='mr-2' /> +880 1901-468559
					</a>
					<a
						href='mailto:itsholidaysbd@gmail.com'
						className='flex items-center justify-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600'
					>
						<FaEnvelope className='mr-2' /> itsholidaysbd@gmail.com
					</a>
				</div> */}
			</div>
		</section>
	)
}

export default ContactPage
