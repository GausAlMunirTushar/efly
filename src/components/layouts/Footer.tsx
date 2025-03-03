'use client'

import Link from 'next/link'
import {
	Mail,
	MapPin,
	Phone,
	Facebook,
	Twitter,
	Linkedin,
	Instagram,
	Youtube
} from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
	return (
		<footer className='bg-background text-white py-8 px-6 md:px-16'>
			<div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-6'>
				{/* Contact Info */}
				<div className='space-y-4'>
					<h2 className='text-lg font-semibold'>
						Best Travel Agent in Bangladesh
					</h2>
					<div className='flex items-center space-x-3'>
						<Phone className='w-5 h-5 text-blue-400' />
						<span>+880 1901-468551</span>
					</div>
					<div className='flex items-center space-x-3'>
						<Mail className='w-5 h-5 text-blue-400' />
						<span>efly@gmail.com</span>
					</div>
					<div className='flex items-center space-x-3'>
						<MapPin className='w-5 h-5 text-blue-400' />
						<span>Banani, Dhaka-1213, Bangladesh</span>
					</div>
					{/* Social Links */}
					<div className='flex space-x-4 mt-4'>
						<Link href='#' className='hover:text-blue-400'>
							<Facebook size={20} />
						</Link>
						<Link href='#' className='hover:text-blue-400'>
							<Twitter size={20} />
						</Link>
						<Link href='#' className='hover:text-blue-400'>
							<Linkedin size={20} />
						</Link>
						<Link href='#' className='hover:text-blue-400'>
							<Instagram size={20} />
						</Link>
						<Link href='#' className='hover:text-blue-400'>
							<Youtube size={20} />
						</Link>
					</div>
				</div>

				{/* Address */}
				<div>
					<h2 className='text-lg font-semibold mb-3'>Address</h2>
					<p>
						📍Corporate Office: Punashi Villa, Level #2, House #150,
						Block #E, Road #10, Banani, Dhaka-1213, Bangladesh
					</p>
					<p className='mt-2'>
						📍Chattogram Branch: 2109/A, Zakir Hossain Road,
						Khulshi, Chattogram, Bangladesh
					</p>
				</div>

				{/* Links */}
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<h2 className='text-lg font-semibold mb-3'>
							Helpful Links
						</h2>
						<ul className='space-y-2'>
							<li>
								<Link
									href='#'
									className='hover:text-blue-400 font-normal'
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='hover:text-blue-400 font-normal'
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='hover:text-blue-400 font-normal'
								>
									Payment Methods
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='hover:text-blue-400 font-normal'
								>
									Customer Support
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='hover:text-blue-400 font-normal'
								>
									Terms & Conditions
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='hover:text-blue-400 font-normal'
								>
									Privacy & Policy
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h2 className='text-lg font-semibold mb-3'>Services</h2>
						<ul className='space-y-2'>
							<li>
								<Link href='#' className='hover:text-blue-400'>
									Flights
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-blue-400'>
									Hotels
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-blue-400'>
									Holidays
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-blue-400'>
									Umrah
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-blue-400'>
									Hajj
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-blue-400'>
									Visa
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			{/* Payment Methods */}
			<div className='container mx-auto mt-6 flex flex-wrap justify-center items-center space-x-4'>
				<Image
					src='/images/payment.webp'
					alt='Mastercard'
					width={1000}
					height={80}
					className='w-full h-40'
				/>
			</div>
		</footer>
	)
}
