import { NextResponse } from 'next/server'
import { connectDatabase } from '@/configs/database'
import User from '@/models/user.model'

export async function GET(_: Request, { params }: { params: { id: string } }) {
	try {
		await connectDatabase()
		const user = await User.findById(params.id)
		if (!user)
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			)
		return NextResponse.json(user, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await connectDatabase()
		const updates = await req.json()
		const updated = await User.findByIdAndUpdate(params.id, updates, {
			new: true
		})
		if (!updated)
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			)
		return NextResponse.json(updated, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await connectDatabase()
		const deleted = await User.findByIdAndDelete(params.id)
		if (!deleted)
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			)
		return NextResponse.json({ message: 'User deleted' }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
