import { NextResponse } from 'next/server'
import Location from '@/models/location.model'
import { connectDatabase } from '@/configs/database'

export async function GET() {
	try {
		await connectDatabase()

		// Get all locations, sorted alphabetically by name
		const locations = await Location.find().sort({ name: 1 }).select('name')

		// Simplify response to id and name
		const response = locations.map(loc => ({
			id: loc._id.toString(),
			name: loc.name
		}))

		return NextResponse.json(response)
	} catch (error) {
		console.error('GET /api/location error:', error)
		return NextResponse.json(
			{ message: 'Failed to fetch locations' },
			{ status: 500 }
		)
	}
}

export async function POST(req: Request) {
	try {
		await connectDatabase()

		const { name } = await req.json()

		// Validate input
		if (!name || typeof name !== 'string' || name.trim().length < 2) {
			return NextResponse.json(
				{
					message:
						'Location name is required and must be at least 2 characters.'
				},
				{ status: 400 }
			)
		}

		const trimmedName = name.trim()

		// Check if location exists (case-insensitive)
		const existing = await Location.findOne({
			name: { $regex: new RegExp(`^${trimmedName}$`, 'i') }
		})
		if (existing) {
			return NextResponse.json(
				{ message: 'Location already exists' },
				{ status: 409 }
			)
		}

		// Create and save new location
		const created = await Location.create({ name: trimmedName })

		return NextResponse.json(
			{ id: created._id.toString(), name: created.name },
			{ status: 201 }
		)
	} catch (error) {
		console.error('POST /api/location error:', error)
		return NextResponse.json(
			{ message: 'Failed to create location' },
			{ status: 500 }
		)
	}
}
