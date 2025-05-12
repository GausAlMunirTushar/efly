import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, subject: string, html: string) => {
	// Create a transporter using Sendmail
	const transporter = nodemailer.createTransport({
		sendmail: true, // This tells Nodemailer to use the sendmail binary (Postfix or Sendmail)
		path: '/usr/sbin/sendmail' // Path to the Sendmail executable
	})

	const mailOptions = {
		from: 'maill@elfy.com.bd', // Sender address
		to, // Recipient email
		subject, // Subject line
		html // HTML content of the email
	}

	try {
		// Send email
		await transporter.sendMail(mailOptions)
		console.log('Email sent successfully')
	} catch (error) {
		console.error('Failed to send email:', error)
		throw new Error('Failed to send email')
	}
}
