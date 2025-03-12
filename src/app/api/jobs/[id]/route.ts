import { NextResponse, NextRequest } from 'next/server'
import Job from '@/models/job.model'
import { connectDatabase } from '@/configs/database'

// Type for the route parameters (id)
interface Params {
	id: string
}

// Handling GET request for a specific job
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> } // Typing params as a Promise
) {
	const { id } = await params // Resolving the Promise for id
	await connectDatabase()

	try {
		const job = await Job.findById(id)

		if (!job) {
			return NextResponse.json(
				{ error: 'Job not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(job, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Error fetching job' },
			{ status: 500 }
		)
	}
}

// Handling PUT request for updating a job
export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> } // Typing params as a Promise
) {
	const { id } = await params // Resolving the Promise for id
	await connectDatabase()

	const {
		title,
		company,
		location,
		description,
		requirements,
		salary,
		deadline,
		status
	} = await req.json()

	if (
		!title ||
		!company ||
		!location ||
		!description ||
		!requirements ||
		!salary ||
		!deadline
	) {
		return NextResponse.json(
			{ error: 'Missing required fields' },
			{ status: 400 }
		)
	}

	try {
		const updatedJob = await Job.findByIdAndUpdate(
			id,
			{
				title,
				company,
				location,
				description,
				requirements,
				salary,
				deadline,
				status
			},
			{ new: true } // Return the updated document
		)

		if (!updatedJob) {
			return NextResponse.json(
				{ error: 'Job not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(updatedJob, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to update job' },
			{ status: 500 }
		)
	}
}

// Handling DELETE request for a job
export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> } // Typing params as a Promise
) {
	const { id } = await params // Resolving the Promise for id
	await connectDatabase()

	try {
		const deletedJob = await Job.findByIdAndDelete(id)

		if (!deletedJob) {
			return NextResponse.json(
				{ error: 'Job not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(
			{ message: 'Job deleted successfully' },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to delete job' },
			{ status: 500 }
		)
	}
}
