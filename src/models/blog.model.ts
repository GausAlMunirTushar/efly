import mongoose, { Schema, Document } from 'mongoose'

export interface IBlog extends Document {
	title: string
	slug: string
	content: string
	category: string
	tags: string[]
	imageUrl: string
	createdAt: Date
}

const BlogSchema = new Schema<IBlog>(
	{
		title: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true },
		content: { type: String, required: true },
		category: { type: String, required: true },
		tags: { type: [String], default: [] },
		imageUrl: { type: String, required: true }
	},
	{ timestamps: true }
)

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
