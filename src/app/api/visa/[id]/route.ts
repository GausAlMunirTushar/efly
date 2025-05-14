import { connectDatabase } from '@/configs/database'
import Visa from '@/models/visa.model'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
	await connectDatabase()
	const visa = await Visa.findById(params.id)
	if (!visa) {
		return NextResponse.json({ message: 'Visa not found' }, { status: 404 })
	}
	return NextResponse.json(visa)
}

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connectDatabase()
	const body = await req.json()
	const updated = await Visa.findByIdAndUpdate(params.id, body, { new: true })
	return NextResponse.json(updated)
}

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } }
) {
	await connectDatabase()
	await Visa.findByIdAndDelete(params.id)
	return NextResponse.json({ success: true })
}
