'use client'

import Image from 'next/image'

const MyProfile = () => {
	return (
		<div className='flex flex-col items-center text-center mt-4 dark:to-bg_dark'>
			<Image
				src='/images/tushar.jpg'
				alt='Profile'
				width={80}
				height={80}
				className='rounded-full border border-gray-300 dark:border-bg_dark'
			/>
			<h3 className='text-xl font-semibold mt-2 text-gray-500 dark:text-text-primary'>
				Tushar
			</h3>
			<p className='text-sm text-gray-500'>admin@admin.com</p>

			<div className='mt-4 space-y-2'>
				<p className='text-gray-700 dark:text-text-primary'>
					<strong>Role:</strong> Administrator
				</p>
				<p className='text-gray-700 dark:text-text-primary'>
					<strong>Joined:</strong> Jan 15, 2024
				</p>
			</div>
		</div>
	)
}

export default MyProfile
