import { connectDatabase } from '@/configs/database'
import Visa from '@/models/visa.model'
import { NextResponse } from 'next/server'

export async function GET(
	_: Request,
	{ params }: { params: Promise<{ country: string }> }
) {
	const { country } = await params
	await connectDatabase()

	const countryName = country.replace(/-/g, ' ')
	const regex = new RegExp(`^${countryName}$`, 'i')
	const visa = await Visa.findOne({ country: regex })

	if (!visa)
		return NextResponse.json({ message: 'Visa not found' }, { status: 404 })

	return NextResponse.json(visa)
}
