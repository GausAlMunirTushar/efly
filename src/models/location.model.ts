import mongoose, { Schema, Document, models } from 'mongoose'

export interface ILocation extends Document {
	name: string
}

const LocationSchema = new Schema<ILocation>(
	{
		name: { type: String, required: true, unique: true, trim: true }
	},
	{
		timestamps: true,
		versionKey: false
	}
)

export default models.Location ||
	mongoose.model<ILocation>('Location', LocationSchema)
