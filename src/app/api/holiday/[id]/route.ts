import { NextResponse } from 'next/server'
import Holiday from '@/models/holiday.model'
import { connectDatabase } from '@/configs/database'

export async function GET(
	_: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		await connectDatabase()
		const found = await Holiday.findById(id)

		if (!found) {
			return NextResponse.json(
				{ message: 'Holiday package not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(found)
	} catch (error) {
		console.error('GET /holiday/:id error:', error)
		return NextResponse.json({ message: 'Server error' }, { status: 500 })
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		await connectDatabase()
		const body = await req.json()

		const updated = await Holiday.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true
		})

		if (!updated) {
			return NextResponse.json(
				{ message: 'Holiday package not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(updated)
	} catch (error) {
		console.error('PUT /holiday/:id error:', error)
		return NextResponse.json(
			{ message: 'Failed to update holiday package' },
			{ status: 500 }
		)
	}
}

export async function DELETE(
	_: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		await connectDatabase()

		const deleted = await Holiday.findByIdAndDelete(id)

		if (!deleted) {
			return NextResponse.json(
				{ message: 'Holiday package not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({
			message: 'Holiday package deleted successfully'
		})
	} catch (error) {
		console.error('DELETE /holiday/:id error:', error)
		return NextResponse.json(
			{ message: 'Failed to delete holiday package' },
			{ status: 500 }
		)
	}
}
