'use client'

import { motion } from 'framer-motion'

const groups = [
	{ id: 1, name: 'Group Name ABC' },
	{ id: 2, name: 'Group Name EFG' },
	{ id: 3, name: 'Group Name GHI' },
	{ id: 4, name: 'Group Name XXX' },
	{ id: 5, name: 'Group Name XYZ' },
	{ id: 6, name: 'Group Name WXY' }
]

// Simple Avatar Component
const Avatar = () => (
	<div className='w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full'>
		<span className='text-lg'>👤</span>
	</div>
)

export default function GroupList() {
	return (
		<div className='w-full max-w-md mx-auto mt-6'>
			<div className='bg-white dark:bg-body_dark shadow-md rounded-lg overflow-hidden'>
				{/* Table Header */}
				<div className='flex items-center bg-gray-100 dark:text-text-primary dark:bg-body_dark px-4 py-2 font-semibold text-gray-700 dark:border-b dark:border-bg_secondary'>
					{/* <span className='w-12'>Avatar</span> */}
					<span>Group Name</span>
				</div>
				<div className='divide-y dark:divide-bg_secondary'>
					{groups.map((group, index) => (
						<motion.div
							key={group.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							whileHover={{ scale: 1.02 }}
							className={`flex items-center p-3  cursor-pointer hover:bg-gray-200 hover:dark:bg-bg_dark transition-all ${
								index === 0
									? 'border-l-4 border-primary-500 dark:border-white'
									: ''
							}`}
						>
							<Avatar />
							<span className='ml-4 text-gray-800 dark:text-text-primary '>
								{group.name}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}
