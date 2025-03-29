import { connectDatabase } from '@/configs/database'
import HomeSlide from '@/models/homeslide.model'
import { NextResponse } from 'next/server'

// Fetch all slides (GET)
export async function GET() {
	await connectDatabase()
	const slides = await HomeSlide.find({})
	return NextResponse.json(slides)
}

// Create a new blog slide
export async function POST(req: Request) {
	await connectDatabase()
	const { image, link } = await req.json()

	if (!image || !link) {
		return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
	}

	const newSlide = await HomeSlide.create({ image, link })
	return NextResponse.json(newSlide, { status: 201 })
}
