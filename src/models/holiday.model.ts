import mongoose, { Schema, Document, models, Types } from 'mongoose'
import { ILocation } from './location.model'

export interface IHoliday extends Document {
	title: string
	description?: string
	imageUrl: string
	location: Types.ObjectId | ILocation
	nightsInfo: string
	price: number
	tags: string[]
	termsAndConditions?: string
	refundCondition?: string
	paymentSchedule?: string
	additionalInfo?: string
	createdAt: Date
	updatedAt: Date
}

const HolidaySchema: Schema<IHoliday> = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		imageUrl: { type: String, required: true },
		location: {
			type: Schema.Types.ObjectId,
			ref: 'Location',
			required: true
		},
		nightsInfo: { type: String, required: true },
		price: { type: Number, required: true },
		tags: { type: [String], required: true },
		termsAndConditions: { type: String },
		refundCondition: { type: String },
		paymentSchedule: { type: String },
		additionalInfo: { type: String }
	},
	{
		timestamps: true,
		versionKey: false
	}
)

const Holiday =
	models.Holiday || mongoose.model<IHoliday>('Holiday', HolidaySchema)

export default Holiday
