import { Schema, Document, model, models } from 'mongoose'

export interface IHomeSlide extends Document {
	image: string
	link: string
	createdAt: Date
}

const HomeSlideSchema = new Schema<IHomeSlide>(
	{
		image: { type: String, required: true },
		link: { type: String, required: true }
	},
	{ timestamps: true, versionKey: false }
)

export default models.HomeSlide ||
	model<IHomeSlide>('BlogSlide', HomeSlideSchema)
