import Link from 'next/link'

export default function BlogCard({
	blog
}: {
	blog: { slug: string; title: string; imageUrl: string }
}) {
	return (
		<div className='p-4 border rounded-lg shadow-md hover:shadow-lg'>
			{blog.imageUrl && (
				<img
					src={blog.imageUrl}
					alt={blog.title}
					className='w-full h-40 object-cover rounded-md mb-3'
				/>
			)}
			<h2 className='text-xl font-semibold'>{blog.title}</h2>
			<Link
				href={`/blog/${blog.slug}`}
				className='text-blue-500 hover:underline'
			>
				Read More
			</Link>
		</div>
	)
}
