import mongoose, { Schema, Document } from 'mongoose'

export interface IJob extends Document {
	title: string
	company: string
	location: string
	description: string
	requirements: string[]
	salary: number
	deadline: Date
	status: 'open' | 'closed'
}

const jobSchema = new Schema<IJob>(
	{
		title: { type: String, required: true },
		company: { type: String, required: true },
		location: { type: String, required: true },
		description: { type: String, required: true },
		requirements: { type: [String], required: true },
		salary: { type: Number, required: true },
		deadline: { type: Date, required: true },
		status: { type: String, enum: ['open', 'closed'], default: 'open' }
	},
	{ timestamps: true }
)

export default mongoose.models.Job || mongoose.model<IJob>('Job', jobSchema)
