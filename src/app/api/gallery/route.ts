import { NextResponse } from 'next/server'
import Gallery from '@/models/gallery.model'

export async function GET() {
	try {
		const galleries = await Gallery.find().sort({ createdAt: -1 })
		return NextResponse.json(galleries)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error fetching galleries', error },
			{ status: 500 }
		)
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const newGallery = new Gallery(body)
		await newGallery.save()
		return NextResponse.json(newGallery, { status: 201 })
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error creating gallery', error },
			{ status: 500 }
		)
	}
}
