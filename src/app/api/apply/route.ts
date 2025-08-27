import { NextResponse } from 'next/server'
import { connectDatabase } from '@/configs/database'
import Applicant from '@/models/applicant.model'

export async function GET() {
	await connectDatabase()

	try {
		const applicants = await Applicant.find().sort({ createdAt: -1 })
		return NextResponse.json({ applicants })
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || 'Failed to fetch applications' },
			{ status: 500 }
		)
	}
}

export async function POST(req: Request) {
	await connectDatabase()
	const {
		firstName,
		lastName,
		email,
		phone,
		portfolio,
		resume,
		coverLetter,
		jobId
	} = await req.json()

	if (!firstName || !lastName || !email || !phone || !resume || !jobId) {
		return NextResponse.json(
			{ error: 'Missing required fields' },
			{ status: 400 }
		)
	}

	const applicant = new Applicant({
		firstName,
		lastName,
		email,
		phone,
		portfolio,
		resume,
		coverLetter,
		jobId
	})

	try {
		await applicant.save()
		return NextResponse.json(
			{ message: 'Application submitted successfully', applicant },
			{ status: 201 }
		)
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || 'Something went wrong' },
			{ status: 500 }
		)
	}
}
