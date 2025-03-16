'use client'

import { createContext, ReactNode, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastContextType {
	success: (message: string) => void
	error: (message: string) => void
	info: (message: string) => void
	warning: (message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastContextProvider({ children }: { children: ReactNode }) {
	const success = (message: string) => toast.success(message)
	const error = (message: string) => toast.error(message)
	const info = (message: string) => toast.info(message)
	const warning = (message: string) => toast.warning(message)

	return (
		<ToastContext.Provider value={{ success, error, info, warning }}>
			{children}
			<ToastContainer
				position='top-right'
				autoClose={3000}
				theme='colored'
			/>
		</ToastContext.Provider>
	)
}

export function useToast() {
	const context = useContext(ToastContext)
	if (!context)
		throw new Error('useToast must be used within a ToastContextProvider')
	return context
}
