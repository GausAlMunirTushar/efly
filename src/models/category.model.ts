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
			required: [true, 'Slug is required'],
			unique: true
		}
	},
	{ timestamps: true, versionKey: false }
)

const Category: Model<ICategory> =
	models.Category || mongoose.model<ICategory>('Category', CategorySchema)

export default Category
