import { NextResponse } from 'next/server'
import Blog from '@/models/blog.model'
import { connectDatabase } from '@/configs/database'

// Get Blog by Slug
export async function GET(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	await connectDatabase()
	const { slug } = await params
	const blog = await Blog.findOne({ slug: slug })
	return blog
		? NextResponse.json(blog)
		: NextResponse.json({ error: 'Not found' }, { status: 404 })
}

// Update Blog
export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	await connectDatabase()
	const { slug } = await params
	const { title, content, category, tags, imageUrl } = await req.json()
	const updatedBlog = await Blog.findOneAndUpdate(
		{ slug: slug },
		{ title, content, category, tags, imageUrl },
		{ new: true }
	)
	return NextResponse.json(updatedBlog)
}

// Delete Blog
export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	await connectDatabase()
	const { slug } = await params
	await Blog.findOneAndDelete({ slug: slug })
	return NextResponse.json({ message: 'Blog deleted' })
}
