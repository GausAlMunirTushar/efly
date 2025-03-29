import mongoose, { Schema, Document, model, models } from 'mongoose'

export interface IBlogSlide extends Document {
	image: string
	link: string
	createdAt: Date
}

const BlogSlideSchema = new Schema<IBlogSlide>(
	{
		image: { type: String, required: true },
		link: { type: String, required: true }
	},
	{ timestamps: true, versionKey: false }
)

export default models.BlogSlide ||
	model<IBlogSlide>('BlogSlide', BlogSlideSchema)
