import BlogCard from '@/components/pages/front-pages/blog/BlogCard'

export default async function BlogPage() {
	const res = await fetch('http://localhost:3000/api/blog')
	const blogs = await res.json()

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-2xl font-bold mb-4'>Blog List</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{blogs.map((blog: any) => (
					<BlogCard key={blog.id} blog={blog} />
				))}
			</div>
		</div>
	)
}
