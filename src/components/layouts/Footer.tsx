import Link from 'next/link'
import React from 'react'
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
	FaWhatsapp
} from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

const Footer = () => {
	const phoneNumber = '+8801400054666'
	const message = 'Hello! I would like to know more about your services.'

	const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
	return (
		<footer className=' text-white py-10 px-5 bg-[#0058A8] shadow-md'>
			<div className='container mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  text-white'>
					{/* About Section */}
					<div className='flex flex-col items-start'>
						<Link href='/' className='cursor-pointer'>
							<img
								src='/efly-white.svg'
								alt='eFly'
								className='h-10'
							/>
						</Link>
						<p className='text-sm mt-2'>
							efly - We Are The New Travel Agency (OTA) in Your
							City. We Are Committed To Making Your Travel Easier
							And More Comfortable With World-Class Services.
						</p>
					</div>

					{/* Links Section */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
						{/* Explore Section */}
						<div>
							<h3 className='text-lg font-semibold'>Explore</h3>
							<ul className='mt-2 space-y-1 text-sm'>
								<li>
									<Link
										href='/about'
										className='hover:text-blue-500'
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										href='/terms'
										className='hover:text-blue-500'
									>
										Terms & Conditions
									</Link>
								</li>
								<li>
									<Link
										href='/privacy-policy'
										className='hover:text-blue-500'
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href='faq'
										className='hover:text-blue-500'
									>
										FAQ
									</Link>
								</li>
							</ul>
						</div>

						{/* Services Section */}
						<div>
							<h3 className='text-lg font-semibold'>Services</h3>
							<ul className='mt-2 space-y-1 text-sm'>
								<li>
									<Link
										href='/flight'
										className='hover:text-blue-500'
									>
										Flight
									</Link>
								</li>
								<li>
									<Link
										href='/visa'
										className='hover:text-blue-500'
									>
										Visa
									</Link>
								</li>
								<li>
									<Link
										href='/holiday'
										className='hover:text-blue-500'
									>
										Holiday
									</Link>
								</li>
								<li>
									<Link
										href='/umrah'
										className='hover:text-blue-500'
									>
										Umrah
									</Link>
								</li>
							</ul>
						</div>
					</div>

					{/* More Links Section */}
					<div>
						<h3 className='text-lg font-semibold'>There is More</h3>
						<ul className='mt-2 space-y-1 text-sm'>
							<li>
								<Link
									href='/blog'
									className='hover:text-blue-500'
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href='/events'
									className='hover:text-blue-500'
								>
									Events
								</Link>
							</li>
							<li>
								<Link
									href='/gallery'
									className='hover:text-blue-500'
								>
									Gallery
								</Link>
							</li>
							<li>
								<Link
									href='/jobs'
									className='hover:text-blue-500'
								>
									Jobs
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Contact Section */}
				<div className='border-t border-blue-600  mt-6 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm'>
					<div>
						<h3 className='font-semibold'>Contact Us</h3>
						<p>
							Email:{' '}
							<Link
								href='mailto:help.efly@gmail.com'
								className='text-white'
							>
								help.efly@gmail.com
							</Link>
						</p>
						<p>
							Phone:{' '}
							<Link
								href='tel:+8801400054666'
								className='text-white'
							>
								+880 1400-054666
							</Link>
						</p>
						<div className='flex space-x-3 mt-3 text-lg'>
							<Link href='#'>
								<FaFacebookF className='hover:text-blue-500' />
							</Link>
							<Link href={whatsappLink} target='_blank'>
								<FaWhatsapp className='hover:text-green-500' />
							</Link>
							<Link href='#'>
								<FaInstagram className='hover:text-pink-500' />
							</Link>
							<Link href='#'>
								<FaLinkedinIn className='hover:text-blue-700' />
							</Link>
						</div>
					</div>

					<div>
						<h3 className='font-semibold'>efly Lounge (Dhaka)</h3>
						<p>
							Mohakhali DOHS, Rode-30, Hous-437, 3rd
							Floor, Dhaka 1206.
						</p>
						<div className='flex items-center space-x-2 mt-2'>
							<FaLocationDot className='text-blue-500' />
							<Link href='#' className='text-blue-500'>
								View Map
							</Link>
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className='border-t border-blue-600 mt-6 pt-4 sm:flex  items-center justify-between text-sm'>
					<div className='flex justify-center space-x-4'>
						<Link href='#' className='hover:text-blue-500'>
							Support Center
						</Link>
						<Link href='#' className='hover:text-blue-500'>
							Payment Security
						</Link>
						<Link
							href='/privacy-policy'
							className='hover:text-blue-500'
						>
							Privacy Policy
						</Link>
						<Link href='#' className='hover:text-blue-500'>
							EMI
						</Link>
					</div>
					<p className='mt-4 sm:mt-0'>
						&copy; {new Date().getFullYear()}{' '}
						<Link href='#' className='text-blue-500'>
							efly
						</Link>
						. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
