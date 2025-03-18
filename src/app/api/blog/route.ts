import { NextResponse, NextRequest } from 'next/server'
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
export async function GET(req: NextRequest) {
	try {
		await connectDatabase()

		const url = req.nextUrl
		const slug = url.searchParams.get('category')
		const limit = url.searchParams.get('limit')
			? parseInt(url.searchParams.get('limit') as string, 5)
			: undefined

		let filter = {}

		if (slug) {
			// Find the category by slug
			const category = await Category.findOne({ slug: slug })

			if (!category) {
				return NextResponse.json(
					{ error: 'Category not found' },
					{ status: 404 }
				)
			}

			// Filter blogs by the found category ID
			filter = { category: category._id }
		}

		let query = Blog.find(filter)
			.populate('category', 'name slug')
			.sort({ createdAt: -1 })

		if (limit) {
			query = query.limit(limit)
		}

		const blogs = await query

		return NextResponse.json(blogs)
	} catch (error) {
		console.error('Error fetching blogs:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
