import { Schema, model, models } from 'mongoose'

const CountrySchema = new Schema(
	{
		name: { type: String, required: true, unique: true, trim: true },
		countryCode: { type: String, required: true, unique: true, trim: true },
		countryImage: { type: String }
	},
	{ timestamps: true }
)

const Country = models.Country || model('Country', CountrySchema)
export default Country
