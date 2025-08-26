import { NextResponse } from 'next/server'
import Job from '@/models/job.model'
import { connectDatabase } from '@/configs/database'

// Handle Job routes (POST, GET for jobs)
export async function POST(req: Request) {
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
		const newJob = new Job({
			title,
			company,
			location,
			description,
			requirements,
			salary,
			deadline,
			status: status || 'open'
		})

		await newJob.save()
		return NextResponse.json(
			{ message: 'Job created successfully', job: newJob },
			{ status: 201 }
		)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to create job' },
			{ status: 500 }
		)
	}
}

export async function GET() {
	await connectDatabase()

	try {
		const jobs = await Job.find().sort({ createdAt: -1 })
		return NextResponse.json(jobs, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch jobs' },
			{ status: 500 }
		)
	}
}
