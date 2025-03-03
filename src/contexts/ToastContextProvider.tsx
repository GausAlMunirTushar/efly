'use client'

import Toast from '@/components/common/Toast'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'

type ToastType = 'success' | 'error' | 'info'

type ToastMessage = {
	id: string
	message: string
	type: ToastType
	duration: number
}

type ToastContextType = {
	addToast: (message: string, type: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastContextProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [toasts, setToasts] = useState<ToastMessage[]>([])

	const addToast = (
		message: string,
		type: ToastType,
		duration: number = 3000
	) => {
		const id = uuidv4()
		setToasts(prev => [...prev, { id, message, type, duration }])

		setTimeout(() => removeToast(id), duration)
	}

	const removeToast = (id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id))
	}

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<div className='fixed top-5 right-5 z-50 flex flex-col space-y-2'>
				{toasts.map(toast => (
					<Toast key={toast.id} {...toast} onRemove={removeToast} />
				))}
			</div>
		</ToastContext.Provider>
	)
}

export const useToast = () => {
	const context = useContext(ToastContext)
	if (!context)
		throw new Error('useToast must be used within a ToastContextProvider')
	return context
}
