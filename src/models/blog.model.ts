import mongoose, { Schema, Document, Types, model, models } from 'mongoose'

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
		title: {
			type: String,
			required: [true, 'Title is required'],
			unique: true,
			trim: true,
			minlength: [5, 'Title must be at least 5 characters long']
		},
		slug: {
			type: String,
			unique: true,
			default: ''
		},
		content: {
			type: String,
			required: [true, 'Content is required'],
			minlength: [20, 'Content must be at least 20 characters long']
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: [true, 'Category is required']
		},
		tags: {
			type: [String],
			default: []
		},
		imageUrl: {
			type: String,
			required: [true, 'Image URL is required'],
			validate: {
				validator: (v: string) => {
					return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/i.test(
						v
					)
				},
				message: 'Invalid image URL format'
			}
		}
	},
	{ timestamps: true, versionKey: false }
)

// Pre-save hook to generate slug automatically if title is modified
BlogSchema.pre<IBlog>('save', function (next) {
	if (this.isModified('title') || this.isNew) {
		this.slug = this.title
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with dashes
			.replace(/[^\w-]+/g, '') // Remove non-alphanumeric characters
			.replace(/-+/g, '-') // Remove multiple dashes
	}
	next()
})

// Check if the model already exists before creating it
const Blog = models.Blog || model<IBlog>('Blog', BlogSchema)

export default Blog
