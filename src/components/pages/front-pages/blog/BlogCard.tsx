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
			<div className='px-4 py-2'>
				<h2 className=' text-xl font-semibold truncate'>
					{blog.title}
				</h2>
				<p className='trucnate line-clamp-3 min-h-24'>{blog.content}</p>
				<div className='my-2'>
					<Link
						href={`/blog/${blog.slug}`}
						className='bg-primary px-4 py-1.5 text-white rounded-lg cursor-pointer'
					>
						Read More
					</Link>
				</div>
			</div>
		</article>
	)
}
