import { NextResponse } from 'next/server'
import Category from '@/models/category.model'
import { connectDatabase } from '@/configs/database'

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connectDatabase()
	const category = await Category.findById(params.id)

	if (!category) {
		return NextResponse.json(
			{ error: 'Category not found' },
			{ status: 404 }
		)
	}
	return NextResponse.json(category)
}

// Update a category
export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connectDatabase()
	const { name } = await req.json()

	// Generate slug from updated name
	const slug = name.toLowerCase().replace(/\s+/g, '-')

	const updatedCategory = await Category.findByIdAndUpdate(
		params.id,
		{ name, slug },
		{ new: true }
	)

	if (!updatedCategory) {
		return NextResponse.json(
			{ error: 'Category not found' },
			{ status: 404 }
		)
	}

	return NextResponse.json(updatedCategory)
}

// Delete a category
export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connectDatabase()
	const deletedCategory = await Category.findByIdAndDelete(params.id)

	if (!deletedCategory) {
		return NextResponse.json(
			{ error: 'Category not found' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ message: 'Category deleted successfully' })
}
