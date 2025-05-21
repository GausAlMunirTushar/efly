import mongoose, { Schema, model, models } from 'mongoose'

const VisaSchema = new Schema(
	{
		country: { type: String, required: true },
		countryCode: { type: String, required: true },
		countryImage: { type: String },
		visaType: {
			type: String,
			enum: ['Tourist Visa'],
			default: 'Tourist Visa'
		},
		visaMode: { type: String, enum: ['E-Visa'], default: 'E-Visa' },
		entryType: {
			type: String,
			enum: ['Single Entry', 'Double Entry', 'Multiple Entry'],
			default: 'Single Entry'
		},
		processingTime: { type: String, default: '45 Working Days' },
		visaValidity: { type: String, default: '90 Days From Issue' },
		maxStay: { type: String, default: '60 Days From Entry' },
		description: { type: String },
		content: { type: String }
	},
	{ timestamps: true }
)

const Visa = models.Visa || model('Visa', VisaSchema)

export default Visa
