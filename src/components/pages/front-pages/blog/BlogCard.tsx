import Link from 'next/link'

export default function BlogCard({
	blog
}: {
	blog: { slug: string; title: string; content: string; imageUrl: string }
}) {
	return (
		<article className=' border rounded-lg shadow-md hover:shadow-lg'>
			<Link href={`/blog/${blog.slug}`} className='cursor-pointer'>
				{blog.imageUrl && (
					<img
						src={blog.imageUrl}
						alt={blog.title}
						className='w-full h-56 object-cover rounded-t-lg mb-3'
					/>
				)}
			</Link>
			<div className='p-4'>
				<h2 className=' text-xl font-semibold'>{blog.title}</h2>
				<p className='trucnate'>{blog.content}</p>
				<Link
					href={`/blog/${blog.slug}`}
					className='text-primary hover:underline cursor-pointer'
				>
					Read More
				</Link>
			</div>
		</article>
	)
}
