// app/models/holiday.model.ts

import mongoose, { Schema, Document, models } from 'mongoose'

export interface IHolidayPackage extends Document {
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

const HolidayPackageSchema: Schema<IHolidayPackage> = new Schema(
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

const HolidayPackage =
	models.HolidayPackage ||
	mongoose.model<IHolidayPackage>('HolidayPackage', HolidayPackageSchema)

export default HolidayPackage
