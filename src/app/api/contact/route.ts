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

export async function GET() {
	try {
		await connectDatabase()
		const contacts = await Contact.find()
		return NextResponse.json(contacts, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Server Error' }, { status: 500 })
	}
}
