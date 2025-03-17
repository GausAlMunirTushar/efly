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

		// Create a new blog post
		const newBlog = await Blog.create({
			title,
			content,
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
// Get All Blogs
export async function GET(req: Request) {
	try {
		await connectDatabase()

		// Parse category query parameter
		const url = new URL(req.url)
		const category = url.searchParams.get('categories') // Adjusted to match the query parameter in the frontend

		const filter = category ? { category } : {}

		// Fetch blogs sorted by creation date (latest first)
		const blogs = await Blog.find(filter)
			.populate('category', 'name')
			.sort({ createdAt: -1 }) // Sorting by createdAt in descending order

		return NextResponse.json(blogs)
	} catch (error) {
		console.error('Error fetching blogs:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
