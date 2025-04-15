import { NextResponse } from 'next/server'
import { connectDatabase } from '@/configs/database'
import Contact from '@/models/contact.model'

export async function POST(req: Request) {
	try {
		await connectDatabase()
		const { name, email, message, phone } = await req.json()

		if (!name || !email || !message || !phone) {
			return NextResponse.json(
				{ error: 'All fields are required' },
				{ status: 400 }
			)
		}

		const newContact = await Contact.create({ name, email, message, phone })
		return NextResponse.json(newContact, { status: 201 })
	} catch (error) {
		return NextResponse.json({ error: 'Server Error' }, { status: 500 })
	}
}

export async function GET(req: Request) {
	try {
		await connectDatabase()

		const { searchParams } = new URL(req.url)
		const page = parseInt(searchParams.get('page') || '1')
		const limit = parseInt(searchParams.get('limit') || '10')
		const skip = (page - 1) * limit

		const contacts = await Contact.find()
			.sort({ status: 1, createdAt: -1 })
			.skip(skip)
			.limit(limit)

		const total = await Contact.countDocuments()

		return NextResponse.json({ contacts, total }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Server Error' }, { status: 500 })
	}
}
