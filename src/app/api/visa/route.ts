import { connectDatabase } from '@/configs/database'
import Visa from '@/models/visa.model'
import { NextResponse } from 'next/server'

export async function GET() {
	await connectDatabase()
	const visas = await Visa.find().sort({ country: 1 })
	return NextResponse.json(visas)
}

export async function POST(req: Request) {
	await connectDatabase()
	const body = await req.json()
	const visa = await Visa.create(body)
	return NextResponse.json(visa, { status: 201 })
}
