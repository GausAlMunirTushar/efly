import { NextResponse } from 'next/server'
import { connectDatabase } from '@/configs/database'
import Contact from '@/models/contact.model'

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await connectDatabase()
		const deletedContact = await Contact.findByIdAndDelete(params.id)

		if (!deletedContact) {
			return NextResponse.json(
				{ error: 'Contact Not Found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(
			{ message: 'Contact Deleted' },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ error: 'Server Error' }, { status: 500 })
	}
}
