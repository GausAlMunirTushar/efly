export default async function BlogDetailPage({
	params
}: {
	params: { id: string }
}) {
	const res = await fetch(`http://localhost:3000/api/blog`)
	const blogs = await res.json()
	const blog = blogs.find((b: any) => b.id === params.id)

	if (!blog) return <div>Blog not found</div>

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-3xl font-bold'>{blog.title}</h1>
			<p className='mt-4'>{blog.content}</p>
		</div>
	)
}
