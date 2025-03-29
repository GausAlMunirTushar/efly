'use client'
import { useEffect } from 'react'

const ErrorPage = ({ error }: { error: Error }) => {
	useEffect(() => {
		console.error('An error occurred:', error)
	}, [error])

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-gray-100 text-center'>
			<h1 className='text-4xl font-bold text-red-500 mb-6'>
				Oops! Something went wrong
			</h1>
			<p className='text-lg mb-4 text-gray-700'>
				Sorry, we encountered an error while processing your request.
			</p>
			<p className='text-md mb-6 text-gray-500'>
				{error.message || 'An unknown error occurred'}
			</p>
			<button
				className='px-6 py-3 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none'
				onClick={() => window.location.reload()}
			>
				Reload
			</button>
		</div>
	)
}

export default ErrorPage
