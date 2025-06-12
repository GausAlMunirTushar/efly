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
			<div className='container mx-auto flex justify-between items-center py-4'>
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

				{/* Right Side - Visible in all screen sizes */}
				<div className='flex items-center space-x-4'>
					{token ? (
						<Image
							src={imgSrc}
							alt='Profile'
							width={40}
							height={40}
							className='rounded-full'
							onError={() => setImgSrc(fallbackImage)}
						/>
					) : (
						<>
							<Link
								href='/signin'
								className='px-4 sm:py-1 py-2 bg-[#0058A8] border border-[#0058A8] text-white rounded-full text-sm'
							>
								Sign In
							</Link>
							<Link
								href='/signup'
								className='px-4 sm:py-1 py-2 border border-[#0058A8] text-[#0058A8]  rounded-full text-sm'
							>
								Sign Up
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}
