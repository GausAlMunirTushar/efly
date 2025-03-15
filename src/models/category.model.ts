import mongoose, { Schema, Document, Model, models } from 'mongoose'

export interface ICategory extends Document {
	name: string
	slug: string
	createdAt: Date
	updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
	{
		name: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true }
	},
	{ timestamps: true, versionKey: false }
)

const Category: Model<ICategory> =
	models.Category || mongoose.model<ICategory>('Category', CategorySchema)

export default Category
