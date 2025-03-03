export default function Loading() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='space-y-4'>
				<div className='animate-pulse'>
					<div className='w-48 h-8 bg-gray-300 rounded-md mb-4'></div>
					<div className='w-64 h-4 bg-gray-300 rounded-md'></div>
					<div className='w-56 h-4 bg-gray-300 rounded-md mt-2'></div>
				</div>
				<div className='mt-4 text-lg text-gray-600'>
					Loading, please wait...
				</div>
			</div>
		</div>
	)
}
