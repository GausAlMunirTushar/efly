import { Schema, model, models, Types } from 'mongoose'

const VisaEntryTypeSchema = new Schema(
	{
		country: {
			type: Types.ObjectId,
			ref: 'Country',
			required: true
		},
		entryType: {
			type: String,
			enum: ['Single Entry', 'Double Entry', 'Multiple Entry'],
			required: true
		},
		visaType: {
			type: String,
			enum: ['Tourist Visa'], // Extend if needed
			required: true
		},
		visaMode: {
			type: String,
			enum: ['E-Visa'], // Extend if needed
			required: true
		},
		processingTime: {
			type: String,
			required: true
		},
		visaValidity: {
			type: String,
			required: true
		},
		maxStay: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		}
	},
	{ timestamps: true }
)

VisaEntryTypeSchema.index({ country: 1, entryType: 1 }, { unique: true })

const VisaEntryType =
	models.VisaEntryType || model('VisaEntryType', VisaEntryTypeSchema)

export default VisaEntryType
