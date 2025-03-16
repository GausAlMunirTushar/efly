import { NextResponse } from 'next/server'
import Blog from '@/models/blog.model'
import { connectDatabase } from '@/configs/database'
import Category from '@/models/category.model'

// Get Blog by Slug
export async function GET(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		await connectDatabase()
		const { slug } = await params
		const blog = await Blog.findOne({ slug }).populate('category', 'name')

		if (!blog) {
			return NextResponse.json({ error: 'Not found' }, { status: 404 })
		}

		return NextResponse.json(blog)
	} catch (error) {
		console.error('Error fetching blog by slug:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

// Update Blog
export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		await connectDatabase()
		const { slug } = await params
		const { title, content, category, tags, imageUrl } = await req.json()

		// Check if the category exists
		const categoryExists = await Category.findById(category)
		if (!categoryExists) {
			return NextResponse.json(
				{ error: 'Invalid category' },
				{ status: 400 }
			)
		}

		// Update the blog post
		const updatedBlog = await Blog.findOneAndUpdate(
			{ slug },
			{ title, content, category, tags, imageUrl },
			{ new: true }
		)

		if (!updatedBlog) {
			return NextResponse.json(
				{ error: 'Blog not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(updatedBlog)
	} catch (error) {
		console.error('Error updating blog:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

// Delete Blog
export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		await connectDatabase()
		const { slug } = await params

		const deletedBlog = await Blog.findOneAndDelete({ slug })

		if (!deletedBlog) {
			return NextResponse.json(
				{ error: 'Blog not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ message: 'Blog deleted successfully' })
	} catch (error) {
		console.error('Error deleting blog:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
