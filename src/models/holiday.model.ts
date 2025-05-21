// app/models/holiday.model.ts

import mongoose, { Schema, Document, models } from 'mongoose'

export interface IHoliday extends Document {
	title: string
	description?: string
	imageUrl: string
	location: string
	nightsInfo: string
	price: number
	tags: string[]
	createdAt: Date
	updatedAt: Date
}

const HolidaySchema: Schema<IHoliday> = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		imageUrl: { type: String, required: true },
		location: { type: String, required: true },
		nightsInfo: { type: String, required: true },
		price: { type: Number, required: true },
		tags: { type: [String], required: true }
	},
	{
		timestamps: true
	}
)

const Holiday =
	models.Holiday || mongoose.model<IHoliday>('Holiday', HolidaySchema)

export default Holiday
