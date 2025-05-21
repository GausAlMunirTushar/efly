import { NextResponse } from 'next/server'
import Holiday from '@/models/holiday.model'
import { connectDatabase } from '@/configs/database'

export async function GET() {
	try {
		await connectDatabase()
		const packages = await Holiday.find().sort({ createdAt: -1 })
		return NextResponse.json(packages)
	} catch (error) {
		console.error('GET /holiday error:', error)
		return NextResponse.json(
			{ message: 'Failed to fetch holiday packages' },
			{ status: 500 }
		)
	}
}

export async function POST(req: Request) {
	try {
		await connectDatabase()
		const body = await req.json()

		if (
			!body.title ||
			!body.imageUrl ||
			!body.location ||
			!body.nightsInfo ||
			!body.price ||
			!body.tags
		) {
			return NextResponse.json(
				{ message: 'Missing required fields' },
				{ status: 400 }
			)
		}

		const created = await Holiday.create(body)
		return NextResponse.json(created, { status: 201 })
	} catch (error) {
		console.error('POST /holiday error:', error)
		return NextResponse.json(
			{ message: 'Failed to create holiday package' },
			{ status: 500 }
		)
	}
}
