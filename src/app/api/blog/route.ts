import { NextResponse } from 'next/server'
import Blog from '@/models/blog.model'
import Category from '@/models/category.model'
import { connectDatabase } from '@/configs/database'

// Create Blog
export async function POST(req: Request) {
	await connectDatabase()
	const { title, content, category, tags, imageUrl } = await req.json()
	const slug = title.toLowerCase().replace(/\s+/g, '-')

	// Validate if category exists
	const categoryExists = await Category.findById(category)
	if (!categoryExists) {
		return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
	}

	const newBlog = await Blog.create({
		title,
		content,
		slug,
		category,
		tags,
		imageUrl
	})

	return NextResponse.json(newBlog, { status: 201 })
}

// Get All Blogs
export async function GET() {
	await connectDatabase()
	const blogs = await Blog.find().populate('category')
	return NextResponse.json(blogs)
}
