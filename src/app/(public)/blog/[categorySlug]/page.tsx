import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BlogCard from '@/components/pages/front-pages/blog/BlogCard'
import SkeletonLoader from '@/components/common/SkeletonLoader'

interface Blog {
	_id: string
	slug: string
	title: string
	content: string
	imageUrl: string
	category: {
		name: string
	}
}

interface Category {
	_id: string
	name: string
	slug: string
	blogCount: number
}

export default function CategoryPage({
	params
}: {
	params: { categorySlug: string }
}) {
	const [blogs, setBlogs] = useState<Blog[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBlogs = async () => {
			setLoading(true)
			try {
				const res = await fetch(
					`/api/blog?category=${params.categorySlug}`
				)
				if (!res.ok) throw new Error('Failed to fetch blogs')
				const data = await res.json()
				setBlogs(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		fetchBlogs()
	}, [params.categorySlug])

	return (
		<section className=''>
			<div className='flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 h-36'>
				<h1 className='text-4xl font-bold text-white'>
					{params.categorySlug} Blogs
				</h1>
			</div>

			<div className='container mx-auto flex gap-6 my-2'>
				{/* Blog Grid */}
				<div className='w-full my-4'>
					{/* Show Skeleton for Blogs */}
					{loading ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							<SkeletonLoader type='blog' />
							<SkeletonLoader type='blog' />
							<SkeletonLoader type='blog' />
						</div>
					) : blogs.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{blogs.map(blog => (
								<BlogCard key={blog._id} blog={blog} />
							))}
						</div>
					) : (
						<p className='text-center text-gray-500'>
							No blogs available.
						</p>
					)}
				</div>
			</div>
		</section>
	)
}
