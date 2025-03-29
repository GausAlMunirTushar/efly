import { connectDatabase } from '@/configs/database'
import BlogSlide from '@/models/blogslide.model'
import { NextResponse } from 'next/server'

// Fetch single slide (GET)
export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connectDatabase()
	const slide = await BlogSlide.findById(params.id)
	if (!slide)
		return NextResponse.json({ error: 'Not found' }, { status: 404 })

	return NextResponse.json(slide)
}

// Update slide (PUT)
export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connectDatabase()
	const { image, link } = await req.json()
	const updatedSlide = await BlogSlide.findByIdAndUpdate(
		params.id,
		{ image, link },
		{ new: true }
	)

	return NextResponse.json(updatedSlide)
}

// Delete slide (DELETE)
export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connectDatabase()
	await BlogSlide.findByIdAndDelete(params.id)
	return NextResponse.json({ message: 'Deleted' })
}
