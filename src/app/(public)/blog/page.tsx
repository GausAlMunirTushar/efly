import BlogCard from '@/components/pages/front-pages/blog/BlogCard'

export default async function BlogPage() {
	const res = await fetch('http://localhost:3000/api/blog')
	const blogs = await res.json()

	return (
		<div className='container mx-auto '>
			<div className='h-20 flex items-center justify-center text-center '>
				<h1 className='text-4xl font-bold'>Blog</h1>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
				{blogs.map((blog: any) => (
					<BlogCard key={blog.id} blog={blog} />
				))}
			</div>
		</div>
	)
}
