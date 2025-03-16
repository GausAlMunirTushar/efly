import mongoose, { Schema, Document, Model, models } from 'mongoose'

export interface ICategory extends Document {
	name: string
	slug: string
}

const CategorySchema = new Schema<ICategory>(
	{
		name: {
			type: String,
			required: [true, 'Category name is required'],
			unique: true
		},
		slug: {
			type: String,
			unique: true,
			default: ''
		}
	},
	{ timestamps: true, versionKey: false }
)

// Pre-save hook to automatically generate the slug
CategorySchema.pre<ICategory>('save', function (next) {
	if (this.isModified('name') || this.isNew) {
		this.slug = this.name
			.trim()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with dashes
			.replace(/[^\w-]+/g, '') // Remove non-alphanumeric characters
			.replace(/-+/g, '-') // Remove multiple dashes
	}
	next()
})

// Check if the model exists before creating it
const Category: Model<ICategory> =
	models.Category || mongoose.model<ICategory>('Category', CategorySchema)

export default Category
