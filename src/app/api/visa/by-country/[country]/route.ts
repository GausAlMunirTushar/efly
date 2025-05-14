import { connectDatabase } from '@/configs/database'
import Visa from '@/models/visa.model'
import { NextResponse } from 'next/server'

export async function GET(
	_: Request,
	{ params }: { params: { country: string } }
) {
	await connectDatabase()

	const countryName = params.country.replace(/-/g, ' ')
	const regex = new RegExp(`^${countryName}$`, 'i')
	const visa = await Visa.findOne({ country: regex })

	if (!visa)
		return NextResponse.json({ message: 'Visa not found' }, { status: 404 })

	return NextResponse.json(visa)
}
