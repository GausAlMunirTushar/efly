import { connectDatabase } from '@/configs/database'
import Visa from '@/models/visa.model'
import { NextResponse } from 'next/server'

export async function GET(
	request: Request,
	{ params }: { params: { country: string } }
) {
	await connectDatabase()

	const visa = await Visa.findOne({
		countryCode: params.country.toUpperCase()
	})
	if (!visa) {
		return NextResponse.json({ message: 'Visa not found' }, { status: 404 })
	}

	return NextResponse.json(visa)
}
