export function generateOtp(): string {
	return Math.floor(100000 + Math.random() * 900000).toString()
}

interface SendSmsOptions {
	phone: string
	message: string
}

export async function sendSms({ phone, message }: SendSmsOptions) {
	const ApiKey = process.env.SMS_API_KEY
	const ClientId = process.env.SMS_CLIENT_ID
	const SenderId = process.env.SMS_SENDER_ID

	const payload = {
		SenderId,
		Is_Unicode: false,
		Is_Flash: false,
		DataCoding: '0', // Default GSM
		SchedTime: '',
		GroupId: '',
		Message: message,
		MobileNumbers: phone,
		ApiKey,
		ClientId
	}

	try {
		const response = await fetch(
			'http://console.smsq.global/api/v2/SendSMS',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			}
		)

		const data = await response.json()

		if (data.ErrorCode !== 0) {
			console.error('SMS API Error:', data.ErrorDescription)
			throw new Error(data.ErrorDescription)
		}

		console.log(
			`✅ OTP sent to ${phone}. MessageId: ${data.Data[0]?.MessageId}`
		)
		return true
	} catch (err) {
		console.error('❌ Failed to send SMS:', err)
		throw err
	}
}
