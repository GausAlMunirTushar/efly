import { NextResponse } from 'next/server'
import cloudinary from '@/utils/cloudinary'

export async function POST(req: Request) {
	try {
		const formData = await req.formData()
		const file = formData.get('file') as File

		if (!file)
			return NextResponse.json(
				{ error: 'No file uploaded' },
				{ status: 400 }
			)

		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`

		// Explicitly use cloudinary.v2.uploader
		const uploadResponse = await cloudinary.uploader.upload(base64Image, {
			folder: 'umrah',
			use_filename: true
		})

		return NextResponse.json({ imageUrl: uploadResponse.secure_url })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Upload failed', details: error },
			{ status: 500 }
		)
	}
}
