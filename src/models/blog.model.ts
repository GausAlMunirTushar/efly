import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IBlog extends Document {
	title: string
	slug: string
	content: string
	category: Types.ObjectId
	tags: string[]
	imageUrl: string
}

const BlogSchema = new Schema<IBlog>(
	{
		title: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true },
		content: { type: String, required: true },
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true
		},
		tags: { type: [String], default: [] },
		imageUrl: { type: String, required: true }
	},
	{ timestamps: true, versionKey: false }
)

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
