export default async function BlogDetailPage({
	params
}: {
	params: { slug: string }
}) {
	const res = await fetch(`http://localhost:3000/api/blog/${params.slug}`, {
		cache: 'no-store'
	})

	if (!res.ok) {
		return (
			<div className='container mx-auto p-6 text-center'>
				Blog not found
			</div>
		)
	}

	const blog = await res.json()

	return (
		<div className='container mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6'>
			{/* Blog Content */}
			<div className='md:col-span-3'>
				{blog.imageUrl && (
					<img
						src={blog.imageUrl}
						alt={blog.title}
						className='w-full h-96 object-cover rounded-lg '
					/>
				)}
				<h1 className='text-3xl font-bold mb-2'>{blog.title}</h1>
				<p className='text-gray-500 text-sm'>{blog.category}</p>

				<p className='mt-4 text-gray-700 leading-relaxed'>
					{blog.content}
				</p>

				{/* Tags */}
				{/* <div className='mt-4 flex flex-wrap gap-2'>
					<strong className='text-gray-600'>Tags:</strong>
					{blog.tags.map((tag: string) => (
						<span
							key={tag}
							className='bg-blue-100 text-blue-700 px-2 py-1 text-sm rounded-md'
						>
							{tag}
						</span>
					))}
				</div> */}
			</div>

			{/* Sidebar */}
			<aside className='md:col-span-1 space-y-6'>
				{/* Categories */}
				<div className='bg-white p-4 rounded-lg box-shadow'>
					<h3 className='font-bold mb-2'>Categories</h3>
					<ul className='space-y-2'>
						{[].map(category => (
							<li
								key={category}
								className='bg-gray-100 p-2 rounded-md text-blue-700 cursor-pointer hover:bg-blue-200'
							>
								{category}
							</li>
						))}
					</ul>
				</div>

				{/* Popular Tags */}
				{blog.tags && blog.tags.length > 0 && (
					<div className='bg-white p-4 rounded-lg box-shadow'>
						<h3 className='font-bold mb-2'>Popular Tags</h3>
						<div className='flex flex-wrap gap-2'>
							{blog.tags.map((tag: string) => (
								<span
									key={tag}
									className='bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded-md'
								>
									{tag.trim()}
								</span>
							))}
						</div>
					</div>
				)}
			</aside>
		</div>
	)
}
