'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children?: React.ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	size = 'md'
}) => {
	const handleEscape = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose()
		},
		[onClose]
	)

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow-hidden')
			window.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.body.classList.remove('overflow-hidden')
			window.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen, handleEscape])

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					key='modal-backdrop'
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						key='modal-content'
						className={`bg-white dark:bg-bg_dark rounded-lg shadow-lg p-4 relative ${
							size === 'sm'
								? 'w-80'
								: size === 'md'
									? 'w-96'
									: 'w-[32rem]'
						} max-h-[80vh] overflow-y-auto scrollbar-hide`}
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 200 }}
						onClick={e => e.stopPropagation()}
						role='dialog'
						aria-modal='true'
					>
						<div className='flex justify-between items-center mb-4'>
							{title && (
								<h2 className='text-lg text-primary-500 font-bold dark:text-text-primary'>
									{title}
								</h2>
							)}
							<button
								onClick={onClose}
								aria-label='Close modal'
								className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-bg_secondary transition-colors'
							>
								<X className='w-5 h-5 text-gray-600 dark:text-text-primary hover:text-red-500' />
							</button>
						</div>
						<div className='max-h-[calc(80vh-100px)] overflow-y-auto'>
							{children}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Modal
