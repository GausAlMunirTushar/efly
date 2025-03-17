type SkeletonLoaderProps = {
	type: 'category' | 'blog'
}

const SkeletonLoader = ({ type }: SkeletonLoaderProps) => {
	if (type === 'category') {
		return (
			<div className='bg-gray-200 animate-pulse p-4 rounded-lg h-full'>
				<div className='h-6 bg-gray-300 rounded w-3/4 mb-4'></div>
				<ul>
					<li className='h-8 bg-gray-300 rounded mb-2'></li>
					<li className='h-8 bg-gray-300 rounded mb-2'></li>
					<li className='h-8 bg-gray-300 rounded mb-2'></li>
				</ul>
			</div>
		)
	}

	return (
		<div className='bg-gray-200 animate-pulse rounded-lg shadow-lg'>
			<div className='h-48 bg-gray-300 rounded-t-lg'></div>
			<div className='p-4'>
				<div className='h-6 bg-gray-300 rounded w-3/4 mb-3'></div>
				<div className='h-4 bg-gray-300 rounded w-1/2'></div>
			</div>
		</div>
	)
}

export default SkeletonLoader
