import { connectDatabase } from '@/configs/database'
import Visa from '@/models/visa.model'
import { NextResponse } from 'next/server'

export async function GET(
	_: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	await connectDatabase()

	const visa = await Visa.findById(id)
	if (!visa) {
		return NextResponse.json({ message: 'Visa not found' }, { status: 404 })
	}
	return NextResponse.json(visa)
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	await connectDatabase()
	const body = await req.json()
	const updated = await Visa.findByIdAndUpdate(id, body, { new: true })
	return NextResponse.json(updated)
}

export async function DELETE(
	_: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	await connectDatabase()
	await Visa.findByIdAndDelete(id)
	return NextResponse.json({ success: true })
}
