import { NextResponse } from 'next/server'
import Gallery from '@/models/gallery.model'

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const gallery = await Gallery.findById(params.id)
		if (!gallery)
			return NextResponse.json(
				{ message: 'Gallery not found' },
				{ status: 404 }
			)
		return NextResponse.json(gallery)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error fetching gallery', error },
			{ status: 500 }
		)
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const body = await request.json()
		const updatedGallery = await Gallery.findByIdAndUpdate(
			params.id,
			body,
			{ new: true }
		)
		if (!updatedGallery)
			return NextResponse.json(
				{ message: 'Gallery not found' },
				{ status: 404 }
			)
		return NextResponse.json(updatedGallery)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error updating gallery', error },
			{ status: 500 }
		)
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const deletedGallery = await Gallery.findByIdAndDelete(params.id)
		if (!deletedGallery)
			return NextResponse.json(
				{ message: 'Gallery not found' },
				{ status: 404 }
			)
		return NextResponse.json({ message: 'Gallery deleted' })
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error deleting gallery', error },
			{ status: 500 }
		)
	}
}
