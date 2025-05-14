import { NextResponse } from 'next/server'
import Umrah from '@/models/umrah.model'
import { connectDatabase } from '@/configs/database'

// GET all Umrah packages
export async function GET() {
	await connectDatabase()
	const umrahPackages = await Umrah.find().sort({ createdAt: -1 })
	return NextResponse.json(umrahPackages)
}

// POST a new Umrah package
export async function POST(req: Request) {
	await connectDatabase()
	const body = await req.json()
	const umrahPackage = await Umrah.create(body)
	return NextResponse.json(umrahPackage, { status: 201 })
}
