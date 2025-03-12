import mongoose, { Schema, Document } from 'mongoose'

export interface IApplicant extends Document {
	firstName: string
	lastName: string
	email: string
	phone: string
	portfolio?: string
	resume: string
	coverLetter?: string
	jobId: mongoose.Schema.Types.ObjectId
	appliedAt: Date
}

const applicantSchema = new Schema<IApplicant>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true },
		portfolio: { type: String },
		resume: { type: String, required: true },
		coverLetter: { type: String },
		jobId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Job',
			required: true
		},
		appliedAt: { type: Date, default: Date.now }
	},
	{ timestamps: true }
)

export default mongoose.models.Applicant ||
	mongoose.model<IApplicant>('Applicant', applicantSchema)
