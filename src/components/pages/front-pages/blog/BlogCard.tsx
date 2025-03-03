import Link from 'next/link'

export default function BlogCard({
	blog
}: {
	blog: { id: string; title: string }
}) {
	return (
		<div className='p-4 border rounded-lg shadow-md hover:shadow-lg'>
			<h2 className='text-xl font-semibold'>{blog.title}</h2>
			<Link
				href={`/blog/${blog.id}`}
				className='text-blue-500 hover:underline'
			>
				Read More
			</Link>
		</div>
	)
}
