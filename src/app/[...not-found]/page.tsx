import Link from 'next/link'

const NotFoundPage = () => {
	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<div className='text-center'>
				<h1 className='text-6xl font-extrabold text-primary-600'>
					404
				</h1>
				<p className='mt-2 text-lg text-gray-500'>
					{`Oops! The page you're looking for doesn't exist.`}
				</p>
				<div className='mt-6'>
					<Link
						href='/'
						className='px-3 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition duration-300'
					>
						Go back to Home
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFoundPage
