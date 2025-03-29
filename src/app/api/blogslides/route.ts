import { connectDatabase } from '@/configs/database'
import BlogSlide from '@/models/blogslide.model'
import { NextResponse } from 'next/server'

// Fetch all slides (GET)
export async function GET() {
	await connectDatabase()
	const slides = await BlogSlide.find({})
	return NextResponse.json(slides)
}

// Create a slide (POST)
export async function POST(req: Request) {
	await connectDatabase()
	const { image, link } = await req.json()
	if (!image || !link) {
		return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
	}

	const newSlide = await BlogSlide.create({ image, link })
	return NextResponse.json(newSlide, { status: 201 })
}
