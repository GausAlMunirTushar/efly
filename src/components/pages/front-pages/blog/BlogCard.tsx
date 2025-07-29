import { Clock5 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogCard({
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
		<article className='border w-full rounded-lg'>
			<Link
				href={`/${blog.slug}`} // Only using the blog slug for the link
				className='cursor-pointer'
			>
				{blog.imageUrl && (
					<div className='relative w-full h-64 object-fill aspect-[683/300] rounded-t-lg border mb-4 overflow-hidden'>
						<Image
							src={blog.imageUrl}
							alt={blog.title}
							fill
							className='h-64 object-fill rounded-t-lg'
							sizes='(max-width: 768px) 100vw, 768px'
							priority
						/>
					</div>
				)}
			</Link>
			<div className='px-4 py-2'>
				<h2 className='text-xl font-semibold truncate'>{blog.title}</h2>
				<div className='flex items-center gap-2 text-sm text-gray-500 my-1'>
					{/* Display the formatted date */}
					<Clock5 size={16} /> <span>{formattedDate}</span>
				</div>
				<p className='line-clamp-3 min-h-24 my-2'>
					{blog.content.replace(/<\/?[^>]+(>|$)/g, '')}
				</p>

				<div className='my-2'>
					<Link
						href={`/${blog.slug}`} // Only using the blog slug for the link
						className='bg-primary px-4 py-1.5 text-white rounded-lg cursor-pointer'
					>
						Read More
					</Link>
				</div>
			</div>
		</article>
	)
}
