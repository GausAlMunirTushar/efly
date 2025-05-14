import { NextResponse } from 'next/server'
import Umrah from '@/models/umrah.model'
import { connectDatabase } from '@/configs/database'

// PUT (Update) an existing Umrah package by ID
export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		await connectDatabase()
		const umrah = await Umrah.findById(id)
		return NextResponse.json(umrah)
	} catch (error) {
		console.log(error)
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	await connectDatabase()
	const body = await req.json()
	const updatedPackage = await Umrah.findByIdAndUpdate(id, body, {
		new: true
	})
	return NextResponse.json(updatedPackage)
}

// DELETE an Umrah package by ID
export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	await connectDatabase()

	await Umrah.findByIdAndDelete(id)
	return NextResponse.json({ success: true })
}
