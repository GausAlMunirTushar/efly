import mongoose, { Schema, model, models } from 'mongoose'

const GallerySchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		galleryImage: { type: String, required: true }
	},
	{ timestamps: true }
)

const Gallery = models.Gallery || model('Gallery', GallerySchema)

export default Gallery
