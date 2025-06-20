import { Clock5, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function PopularBlogCard({
	blog,
	category
}: {
	blog: {
		slug: string
		title: string
		content: string
		imageUrl: string
		createdAt: string // Include createdAt field
	}
	category?: string // Optional, for category-based blog post
}) {
	// Format the date to a readable format
	const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})

	return (
		<article className='w-80 border rounded-lg'>
			<Link href={`/${blog.slug}`} className='cursor-pointer'>
				{blog.imageUrl && (
					<img
						src={blog.imageUrl}
						alt={blog.title}
						className='w-full h-64 object-fill rounded-t-lg mb-3'
					/>
				)}
			</Link>
			<div className='px-4 py-2'>
				<h2 className='text-xl font-semibold truncate'>{blog.title}</h2>
				<div className='flex items-center gap-2 text-sm text-gray-500 my-1'>
					{/* Display the formatted date */}
					<Clock5 size={16} /> <span>{formattedDate}</span>
				</div>
				<p className='line-clamp-2 truncate min-h-10 my-2'>
					{blog.content.replace(/<\/?[^>]+(>|$)/g, '')}
				</p>

				<div className='pb-2'>
					<Link
						href={`/${blog.slug}`} // Only using the blog slug for the link
						className='bg-[#0058A8] w-full text-center px-4 py-1.5 text-white rounded-lg cursor-pointer flex items-center justify-center gap-2'
					>
						<span>Read More</span> <ExternalLink size={13} />
					</Link>
				</div>
			</div>
		</article>
	)
}
