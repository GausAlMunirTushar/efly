import { NextResponse } from 'next/server'
import { connectDatabase } from '@/configs/database'
import Applicant from '@/models/applicant.model'

interface Params {
	id: string
}
export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	await connectDatabase()

	try {
		const applicant = await Applicant.findById(id)
		if (!applicant) {
			return NextResponse.json(
				{ error: 'Applicant not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json({ applicant })
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || 'Failed to fetch applicant' },
			{ status: 500 }
		)
	}
}
