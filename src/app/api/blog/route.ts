import { NextResponse } from 'next/server'
import Blog from '@/models/blog.model'
import Category from '@/models/category.model'
import { connectDatabase } from '@/configs/database'

// Create Blog
export async function POST(req: Request) {
	try {
		await connectDatabase()
		const { title, content, category, tags, imageUrl } = await req.json()

		// Validate if category exists
		const categoryExists = await Category.findById(category)
		if (!categoryExists) {
			return NextResponse.json(
				{ error: 'Invalid category' },
				{ status: 400 }
			)
		}

		const slug = title.toLowerCase().replace(/\s+/g, '-')
		const newBlog = await Blog.create({
			title,
			content,
			slug,
			category,
			tags,
			imageUrl
		})

		return NextResponse.json(newBlog, { status: 201 })
	} catch (error) {
		console.error('Error creating blog:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

// Get All Blogs
export async function GET() {
	try {
		await connectDatabase()
		const blogs = await Blog.find().populate('category')
		return NextResponse.json(blogs)
	} catch (error) {
		console.error('Error fetching blogs:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
