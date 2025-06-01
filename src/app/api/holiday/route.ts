import { NextResponse } from 'next/server'
import Holiday from '@/models/holiday.model'
import Location from '@/models/location.model' // ✅ Required for .populate()
import { connectDatabase } from '@/configs/database'

export async function GET(req: Request) {
	try {
		await connectDatabase()
		const url = new URL(req.url)
		const location = url.searchParams.get('location') // this is now ID

		const query = location ? { location: location } : {}

		const packages = await Holiday.find(query)
			.populate('location', 'name') // ✅ Clean object with location.name
			.sort({ createdAt: -1 })

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
