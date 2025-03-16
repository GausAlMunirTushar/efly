import { NextResponse } from 'next/server'
import Category from '@/models/category.model'
import { connectDatabase } from '@/configs/database'

// Create a new category
export async function POST(req: Request) {
	try {
		await connectDatabase()
		const { name } = await req.json()

		if (!name) {
			return NextResponse.json(
				{ error: 'Category name is required' },
				{ status: 400 }
			)
		}

		// Generate slug safely
		const slug = name.trim().toLowerCase().replace(/\s+/g, '-')

		// Check if category already exists
		const existingCategory = await Category.findOne({ slug })
		if (existingCategory) {
			return NextResponse.json(
				{ error: 'Category already exists' },
				{ status: 400 }
			)
		}

		const newCategory = await Category.create({ name, slug })
		return NextResponse.json(newCategory, { status: 201 })
	} catch (error) {
		console.error('Error creating category:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

// Get all categories
export async function GET() {
	try {
		await connectDatabase()
		const categories = await Category.find()
		return NextResponse.json(categories)
	} catch (error) {
		console.error('Error fetching categories:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
