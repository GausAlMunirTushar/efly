import mongoose, { Schema, Document } from 'mongoose'

export interface IContact extends Document {
	name: string
	email: string
	message: string
	phone: string
	status:
		| 'new'
		| 'called'
		| 'no answer'
		| 'call back later'
		| 'not interested'
		| 'interested'
		| 'converted'
		| 'invalid number'
		| string
	createdAt: Date
}

const ContactSchema = new Schema<IContact>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		message: { type: String, required: true },
		phone: { type: String, required: true },
		status: {
			type: String,
			enum: [
				'new',
				'called',
				'no answer',
				'call back later',
				'not interested',
				'interested',
				'converted',
				'invalid number'
			],
			default: 'new'
		}
	},
	{ timestamps: true }
)

export default mongoose.models.Contact ||
	mongoose.model<IContact>('Contact', ContactSchema)
