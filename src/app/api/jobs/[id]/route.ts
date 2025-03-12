import { NextResponse } from 'next/server'
import Job from '@/models/job.model'
import { connectDatabase } from '@/configs/database'

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params
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

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params
	await connectDatabase() // Ensure DB connection

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

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params
	await connectDatabase() // Ensure DB connection

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
