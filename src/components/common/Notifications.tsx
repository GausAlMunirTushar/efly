'use client'

import { useState, useEffect, useRef } from 'react'
import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react'

interface Notification {
	id: number
	message: string
	type: 'success' | 'error' | 'info'
	timestamp: string
}

const notificationsData: Notification[] = [
	{
		id: 1,
		message: 'Your account has been updated successfully!',
		type: 'success',
		timestamp: '2m ago'
	},
	{
		id: 2,
		message: 'Payment failed. Please check your billing details.',
		type: 'error',
		timestamp: '10m ago'
	},
	{
		id: 3,
		message: 'New feature available! Check out the latest update.',
		type: 'info',
		timestamp: '1h ago'
	}
]

export default function Notifications() {
	const [notifications, setNotifications] =
		useState<Notification[]>(notificationsData)
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Toggle notification dropdown
	const toggleDropdown = () => setIsOpen(prev => !prev)

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () =>
			document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// Remove notification
	const removeNotification = (id: number) => {
		setNotifications(prev =>
			prev.filter(notification => notification.id !== id)
		)
	}

	// Notification icon mapping
	const getIcon = (type: Notification['type']) => {
		switch (type) {
			case 'success':
				return <CheckCircle className='text-green-500 w-5 h-5' />
			case 'error':
				return <AlertCircle className='text-red-500 w-5 h-5' />
			case 'info':
				return <Info className='text-blue-500 w-5 h-5' />
			default:
				return null
		}
	}

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={toggleDropdown}
				className='relative p-2 rounded-full bg-gray-100 dark:text-text-dark dark:bg-bg_dark hover:bg-gray-200 duration-500 transition-colors  '
			>
				<Bell className='w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-gray-400' />
				{notifications.length > 0 && (
					<span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
						{notifications.length}
					</span>
				)}
			</button>

			{isOpen && (
				<div className='absolute right-0 mt-4 w-80 bg-white dark:bg-bg_dark shadow-lg rounded-lg overflow-hidden border dark:border-gray-700'>
					<div className='p-4 border-b dark:border-gray-700 flex justify-between items-center'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
							Notifications
						</h3>
						<button
							onClick={() => setNotifications([])}
							className='text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500'
						>
							Clear All
						</button>
					</div>

					{notifications.length === 0 ? (
						<p className='p-4 text-gray-500 dark:text-gray-400 text-center'>
							No new notifications
						</p>
					) : (
						<ul className='max-h-60 overflow-y-auto  divide-y dark:divide-gray-700'>
							{notifications.map(notification => (
								<li
									key={notification.id}
									className='flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-bg_secondary'
								>
									{getIcon(notification.type)}
									<div className='flex-1'>
										<p className='text-sm text-gray-900 dark:text-white'>
											{notification.message}
										</p>
										<span className='text-xs text-gray-500 dark:text-gray-400'>
											{notification.timestamp}
										</span>
									</div>
									<button
										onClick={() =>
											removeNotification(notification.id)
										}
										className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
									>
										<X className='w-4 h-4' />
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	)
}
