import { NextResponse } from 'next/server'
import Category from '@/models/category.model'
import { connectDatabase } from '@/configs/database'

// Get a single category by id
export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
	await connectDatabase()
	const { id } = await params
	const category = await Category.findById(id)

	if (!category) {
		return NextResponse.json(
			{ error: 'Category not found' },
			{ status: 404 }
		)
	}
	return NextResponse.json(category)
}

// Update a category by id
export async function PATCH(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
	await connectDatabase()
	const { id } = await params
	const { name } = await req.json()

	// Generate slug from updated name
	const slug = name.toLowerCase().replace(/\s+/g, '-')

	const updatedCategory = await Category.findByIdAndUpdate(
		id,
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

// Delete a category by id
export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
	await connectDatabase()
	const { id } = await params
	const deletedCategory = await Category.findByIdAndDelete(id)

	if (!deletedCategory) {
		return NextResponse.json(
			{ error: 'Category not found' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ message: 'Category deleted successfully' })
}
