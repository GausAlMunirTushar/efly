import { NextResponse } from 'next/server'
import Category from '@/models/category.model'
import { connectDatabase } from '@/configs/database'

// Create a new category
export async function POST(req: Request) {
	await connectDatabase()
	const { name } = await req.json()

	// Generate slug from category name
	const slug = name.toLowerCase().replace(/\s+/g, '-')

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
}

// Get all categories
export async function GET() {
	await connectDatabase()
	const categories = await Category.find()
	return NextResponse.json(categories)
}
