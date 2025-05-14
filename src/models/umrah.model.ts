import mongoose, { Schema, model, models } from 'mongoose'

const UmrahSchema = new Schema(
	{
		packagename: { type: String, required: true },
		description: { type: String },
		price: { type: Number, required: true },
		duration: { type: String },
		images: [{ type: String }],
		includedServices: [String],
		isFeatured: { type: Boolean, default: false }
	},
	{ timestamps: true }
)

const Umrah = models.Umrah || model('Umrah', UmrahSchema)

export default Umrah
