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
	return (
		<footer className=' text-gray-700 py-10 px-5'>
			<div className='container mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  text-gray-800'>
					{/* About Section */}
					<div className='flex flex-col items-start'>
						<Link href='/' className='cursor-pointer'>
							<img src='/efly.png' alt='eFly' className='h-10' />
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
									<a href='#' className='hover:text-blue-500'>
										About Us
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-blue-500'>
										Terms & Conditions
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-blue-500'>
										FAQ
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-blue-500'>
										Hotel Sitemap
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-blue-500'>
										Medical Tourism
									</a>
								</li>
							</ul>
						</div>

						{/* Services Section */}
						<div>
							<h3 className='text-lg font-semibold'>Services</h3>
							<ul className='mt-2 space-y-1 text-sm'>
								<li>
									<a href='#' className='hover:text-blue-500'>
										Flight
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-blue-500'>
										Visa
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-blue-500'>
										Holiday
									</a>
								</li>
								<li>
									<a href='#' className='hover:text-blue-500'>
										Omra
									</a>
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
				<div className='border-t border-gray-100 mt-6 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm'>
					<div>
						<h3 className='font-semibold'>Contact Us</h3>
						<p>
							Email:{' '}
							<a
								href='mailto:ask@eFly.net'
								className='text-blue-500'
							>
								ask@eFly.net
							</a>
						</p>
						<p>
							Phone:{' '}
							<a
								href='tel:+8809617617617'
								className='text-blue-500'
							>
								+880 9617 617617
							</a>
						</p>
						<p>
							WhatsApp:{' '}
							<a href='#' className='text-blue-500'>
								Message us
							</a>
						</p>
						<div className='flex space-x-3 mt-3 text-lg'>
							<a href='#'>
								<FaFacebookF className='hover:text-blue-500' />
							</a>
							<a href='#'>
								<FaWhatsapp className='hover:text-green-500' />
							</a>
							<a href='#'>
								<FaInstagram className='hover:text-pink-500' />
							</a>
							<a href='#'>
								<FaLinkedinIn className='hover:text-blue-700' />
							</a>
						</div>
					</div>

					<div>
						<h3 className='font-semibold'>eFly Lounge (Dhaka)</h3>
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

					{/* <div>
						<h3 className='font-semibold'>Chattogram Office</h3>
						<p>
							BM Height 5th Floor, 318 Sheikh Mujib Road,
							Chattogram 4100, Bangladesh
						</p>
						<a href='#' className='text-blue-500'>
							View Map
						</a>
					</div> */}
				</div>

				{/* Accreditations and Partners */}
				{/* <div className='border-t border-gray-300 mt-6 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-center'>
					<div>
						<h3 className='font-semibold'>Accredited Member</h3>
						<img
							src='basis.png'
							alt='BASIS'
							className='h-8 mx-auto'
						/>
					</div>
					<div>
						<h3 className='font-semibold'>Verified by</h3>
						<img
							src='trust-logo.png'
							alt='Verified'
							className='h-8 mx-auto'
						/>
					</div>
					<div>
						<h3 className='font-semibold'>Our Partners</h3>
						<img
							src='google.png'
							alt='Google'
							className='h-8 mx-auto'
						/>
					</div>
					<div>
						<h3 className='font-semibold'>Certified By</h3>
						<img src='iso.png' alt='ISO' className='h-8 mx-auto' />
					</div>
				</div> */}

				{/* Footer Bottom */}
				<div className='border-t border-gray-100 mt-6 pt-4 sm:flex  items-center justify-between text-sm'>
					<div className='flex justify-center space-x-4'>
						<a href='#' className='hover:text-blue-500'>
							Support Center
						</a>
						<a href='#' className='hover:text-blue-500'>
							Payment Security
						</a>
						<a href='#' className='hover:text-blue-500'>
							Privacy Policy
						</a>
						<a href='#' className='hover:text-blue-500'>
							EMI
						</a>
					</div>
					<p className='mt-4 sm:mt-0'>
						&copy; {new Date().getFullYear()}{' '}
						<Link href='#' className='text-blue-500'>
							eFly
						</Link>
						. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
