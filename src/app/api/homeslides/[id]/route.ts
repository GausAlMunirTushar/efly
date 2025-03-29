import { connectDatabase } from '@/configs/database'
import HomeSlide from '@/models/homeslide.model'
import { NextResponse } from 'next/server'

// Fetch single slide (GET)
export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
	try {
		const { id } = await params // Resolving the Promise for `params`
		await connectDatabase()
		const slide = await HomeSlide.findById(id)
		if (!slide) {
			return NextResponse.json({ error: 'Not found' }, { status: 404 })
		}
		return NextResponse.json(slide)
	} catch (error) {
		console.error('Error fetching slide:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

// Update slide (PUT)
export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
	try {
		const { id } = await params // Resolving the Promise for `params`
		const { image, link } = await req.json()
		await connectDatabase()
		const updatedSlide = await HomeSlide.findByIdAndUpdate(
			id,
			{ image, link },
			{ new: true }
		)
		if (!updatedSlide) {
			return NextResponse.json({ error: 'Not found' }, { status: 404 })
		}
		return NextResponse.json(updatedSlide)
	} catch (error) {
		console.error('Error updating slide:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

// Delete slide (DELETE)
export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
	try {
		const { id } = await params // Resolving the Promise for `params`
		await connectDatabase()
		const deletedSlide = await HomeSlide.findByIdAndDelete(id)
		if (!deletedSlide) {
			return NextResponse.json({ error: 'Not found' }, { status: 404 })
		}
		return NextResponse.json({ message: 'Deleted' })
	} catch (error) {
		console.error('Error deleting slide:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
