export function generateOtp(): string {
	return Math.floor(100000 + Math.random() * 900000).toString()
}

interface SendSmsOptions {
	phone: string
	message: string
}

export async function sendSms({ phone, message }: SendSmsOptions) {
	if (!message || typeof message !== 'string' || message.trim() === '') {
		throw new Error('SMS message content is empty')
	}

	// ✅ Normalize phone to international format for Bangladesh
	const normalizedPhone = phone.startsWith('880')
		? phone
		: phone.replace(/^0/, '880')

	const ApiKey = process.env.SMS_API_KEY
	const ClientId = process.env.SMS_CLIENT_ID
	const SenderId = process.env.SMS_SENDER_ID

	if (!ApiKey || !ClientId || !SenderId) {
		throw new Error('SMS API credentials are not set')
	}

	const payload = {
		SenderId,
		Is_Unicode: false,
		Is_Flash: false,
		DataCoding: '0',
		SchedTime: '',
		GroupId: '',
		Message: message,
		MobileNumbers: normalizedPhone,
		ApiKey,
		ClientId
	}

	console.log('📤 SMS Payload:', JSON.stringify(payload, null, 2))

	try {
		const response = await fetch(
			'https://console.smsq.global/api/v2/SendSMS',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			}
		)

		const text = await response.text()
		console.log('📥 Raw SMS API Response:', text)

		let data
		try {
			data = JSON.parse(text)
		} catch (e) {
			console.error('❌ Failed to parse SMS API JSON:', e)
			throw new Error('Invalid JSON response from SMS API')
		}

		if (data.ErrorCode !== 0) {
			console.error('❌ SMS API Error:', data.ErrorDescription)
			throw new Error(data.ErrorDescription)
		}

		if (!data.Data || !data.Data[0]?.MessageId) {
			console.warn(
				'⚠️ SMS sent but MessageId missing — possible delivery issue'
			)
		}

		console.log(
			`✅ OTP sent to ${normalizedPhone}. MessageId: ${data.Data[0]?.MessageId}`
		)
		return true
	} catch (err) {
		console.error('❌ Failed to send SMS:', err)
		throw err
	}
}
