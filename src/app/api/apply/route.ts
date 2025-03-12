import { NextResponse } from 'next/server'
import { connectDatabase } from '@/configs/database'
import Applicant from '@/models/applicant.model'

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

	// Validation for required fields
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
		await applicant.save() // Save to the database
		return NextResponse.json(
			{ message: 'Application submitted successfully', applicant },
			{ status: 201 }
		)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 500 }
		)
	}
}
