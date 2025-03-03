'use client'
import React, { useEffect } from 'react'
import { CheckCircle, XCircle, Info } from 'lucide-react'

type ToastProps = {
	id: string
	message: string
	type: 'success' | 'error' | 'info'
	duration: number // in ms
	onRemove: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({
	id,
	message,
	type,
	duration,
	onRemove
}) => {
	useEffect(() => {
		const timer = setTimeout(() => onRemove(id), duration)
		return () => clearTimeout(timer)
	}, [id, duration, onRemove])

	const getIcon = () => {
		switch (type) {
			case 'success':
				return <CheckCircle className='h-6 w-6 text-green-500' />
			case 'error':
				return <XCircle className='h-6 w-6 text-red-500' />
			case 'info':
				return <Info className='h-6 w-6 text-blue-500' />
			default:
				return null
		}
	}

	const getBgColor = () => {
		switch (type) {
			case 'success':
				return 'bg-green-100'
			case 'error':
				return 'bg-red-100'
			case 'info':
				return 'bg-blue-100'
			default:
				return 'bg-gray-100'
		}
	}

	return (
		<div
			className={`flex items-center justify-between p-4 mb-4 rounded-lg shadow-md ${getBgColor()}`}
		>
			<div className='flex items-center space-x-2'>
				{getIcon()}
				<span className='text-sm font-medium text-gray-800'>
					{message}
				</span>
			</div>
			<button
				onClick={() => onRemove(id)}
				className='ml-4 text-gray-500 hover:text-gray-700'
			>
				<span className='sr-only'>Close</span>
				<XCircle className='h-6 w-6' />
			</button>
		</div>
	)
}

export default Toast
