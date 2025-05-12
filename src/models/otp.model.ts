// models/otp.model.ts
import mongoose, { Schema, Document } from 'mongoose'

interface IOtp extends Document {
	phone: string
	otp: string
	expiresAt: Date
}

const OtpSchema = new Schema<IOtp>(
	{
		phone: { type: String, required: true },
		otp: { type: String, required: true },
		expiresAt: { type: Date, required: true }
	},
	{ timestamps: true, versionKey: false }
)

export default mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema)
