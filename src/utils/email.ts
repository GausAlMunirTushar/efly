import nodemailer from 'nodemailer'

/**
 * This function sends an email using Sendmail/Postfix via the local SMTP server.
 * @param to - The recipient email address.
 * @param subject - The email subject.
 * @param html - The email content in HTML format.
 */
export const sendEmail = async (to: string, subject: string, html: string) => {
	// Create a transporter using Sendmail (Postfix is the default MTA)
	const transporter = nodemailer.createTransport({
		// Assuming you're using your own Sendmail/Postfix server on localhost
		// If you're using a third-party SMTP provider (like Gmail, SendGrid, etc.), you would configure it differently.
		service: 'Sendmail', // Sendmail or Postfix (based on your setup)
		path: '/usr/sbin/sendmail' // Path to the Sendmail executable
	})

	const mailOptions = {
		from: 'your-email@elfy.com.bd', // Sender address (should be a valid domain set up in your server)
		to, // Recipient email
		subject, // Subject line
		html // HTML content for the email
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
