import BlogCard from '@/components/pages/front-pages/blog/BlogCard'

export default async function BlogPage() {
	try {
		const API_URL =
			process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

		const res = await fetch(`${API_URL}/api/blog`, {
			cache: 'no-store'
		})

		if (!res.ok) {
			throw new Error('Failed to fetch blogs')
		}

		const blogs = await res.json()

		return (
			<div className='container mx-auto '>
				<div className='h-20 flex items-center justify-center text-center '>
					<h1 className='text-4xl font-bold'>Blog</h1>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-3'>
					{blogs.length > 0 ? (
						blogs.map((blog: any) => (
							<BlogCard key={blog.id} blog={blog} />
						))
					) : (
						<p className='text-center text-gray-500'>
							No blogs available.
						</p>
					)}
				</div>
			</div>
		)
	} catch (error) {
		console.error('Error fetching blogs:', error)
		return (
			<div className='text-center text-red-500'>
				Failed to load blogs.
			</div>
		)
	}
}
