'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Cookies from 'js-cookie'
import Image from 'next/image'

const fallbackImage = '/images/avatar.png'

export default function HomeNavbar() {
	const [isMenuOpen, setMenuOpen] = useState(false)
	const token = Cookies.get('token')
	const [imgSrc, setImgSrc] = useState(fallbackImage)

	return (
		<nav className='bg-white shadow z-50'>
			<div className='container mx-auto flex justify-between items-center py-5 sm:py-2.5'>
				{/* Logo */}
				<Link href='/' className='flex items-center space-x-2'>
					<img
						src='/efly.png'
						alt='Logo'
						width={40}
						height={40}
						className='h-8 w-auto'
					/>
				</Link>

				{/* Desktop Right Side */}
				<div className='hidden md:flex items-center space-x-4'>
					<Link
						href='/contact'
						className='px-4 py-2 hover:text-primary'
					>
						Contact Us
					</Link>
					{token ? (
						<Image
							src={imgSrc}
							alt='Profile'
							width={40}
							height={40}
							className='rounded-full'
						/>
					) : (
						<>
							<Link
								href='/signin'
								className='px-4 py-1 bg-primary border border-primary text-white rounded-full'
							>
								Sign In
							</Link>
							<Link
								href='/signup'
								className='px-4 py-1 border border-primary text-primary rounded-full'
							>
								Sign Up
							</Link>
						</>
					)}
				</div>

				{/* Mobile Menu Icon */}
				<button
					className='md:hidden text-gray-600'
					onClick={() => setMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className='md:hidden px-4 py-4 space-y-2 bg-white shadow'>
					<Link
						href='/contact'
						className='block px-4 py-2 border-l-4 border-transparent hover:border-primary hover:text-primary'
					>
						Contact Us
					</Link>
					{token ? (
						<div className='px-4 py-2 text-primary'>
							User Profile
						</div>
					) : (
						<>
							<Link
								href='/signin'
								className='block px-4 py-2 bg-primary text-white rounded-md text-center'
							>
								Sign In
							</Link>
							<Link
								href='/signup'
								className='block px-4 py-1.5 border border-primary text-primary rounded-md text-center'
							>
								Sign Up
							</Link>
						</>
					)}
				</div>
			)}
		</nav>
	)
}
