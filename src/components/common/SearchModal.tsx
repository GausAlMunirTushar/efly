'use client'

import { useEffect, useRef, useCallback, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search } from 'lucide-react'

interface SearchModalProps {
	isOpen: boolean
	onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [searchQuery, setSearchQuery] = useState('')
	const router = useRouter()

	// Define navigation routes dynamically based on
	const searchRoutes = useMemo(
		() => [
			{ name: 'Dashboard', path: `/dashboard` },
			{ name: 'Profile', path: `/profile` },
			{ name: 'Settings', path: `/settings` },
			{ name: 'Analytics', path: `/analytics` },
			{ name: 'CRM', path: `/crm` },
			{ name: 'Users', path: `/users` },
			{ name: 'Invoices', path: `/invoices` },
			{ name: 'Orders', path: `/orders` }
		],
		[]
	)

	const [filteredRoutes, setFilteredRoutes] = useState(searchRoutes)

	// Close modal on Escape key
	const handleEscape = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose()
		},
		[onClose]
	)

	// Focus input when modal opens
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow-hidden')
			window.addEventListener('keydown', handleEscape)

			// Auto-focus on input after a short delay
			setTimeout(() => inputRef.current?.focus(), 100)
		} else {
			document.body.classList.remove('overflow-hidden')
		}

		return () => {
			window.removeEventListener('keydown', handleEscape)
			document.body.classList.remove('overflow-hidden')
		}
	}, [isOpen, handleEscape])

	// Filter results based on search query
	useEffect(() => {
		setFilteredRoutes(
			searchRoutes.filter(route =>
				route.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
		)
	}, [searchQuery, searchRoutes])

	if (!isOpen) return null

	return (
		<AnimatePresence>
			<motion.div
				className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
			>
				<motion.div
					className='bg-white dark:bg-bg_dark  max-h-[95%] overflow-y-scroll scrollbar-none rounded-xl shadow-xl p-6 w-full max-w-lg relative'
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
					transition={{ type: 'spring', stiffness: 200, damping: 20 }}
					onClick={e => e.stopPropagation()}
				>
					{/* Search Input & Close Button */}
					<div className='flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm'>
						<div className='flex items-center w-full'>
							<Search className='w-5 h-5 text-gray-500' />
							<input
								type='text'
								ref={inputRef}
								placeholder='Search...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='bg-transparent outline-none px-3 w-full text-gray-700 dark:text-white text-lg'
							/>
						</div>
						<button
							onClick={onClose}
							className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300'
						>
							<X className='w-5 h-5 text-gray-600 hover:text-red-500 transition-colors duration-300' />
						</button>
					</div>

					{/* Search Results */}
					<div className='mt-4'>
						{filteredRoutes.length > 0 ? (
							<ul className='space-y-2'>
								{filteredRoutes.map(route => (
									<li
										key={route.path}
										className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition'
										onClick={() => {
											router.push(route.path)
											onClose()
										}}
									>
										{route.name}
									</li>
								))}
							</ul>
						) : (
							<p className='text-gray-500 dark:text-gray-400 text-center'>
								No results found.
							</p>
						)}
					</div>

					{/* Accessibility Help */}
					<div className='mt-6 text-gray-400 text-sm flex justify-between'>
						<p>
							Press{' '}
							<kbd className='bg-gray-200 px-2 py-1 rounded-md'>
								Esc
							</kbd>{' '}
							to close
						</p>
						<p>
							Use{' '}
							<kbd className='bg-gray-200 px-2 py-1 rounded-md'>
								↑ ↓
							</kbd>{' '}
							to navigate
						</p>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}

export default SearchModal
