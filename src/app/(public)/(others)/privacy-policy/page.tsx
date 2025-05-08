import React from 'react'

const PrivacyPolicyPage = () => {
	return (
		<main className='max-w-4xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>Privacy Policy</h1>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>1. Introduction</h2>
				<p>
					At efly, your privacy is our priority. This Privacy Policy
					explains how we collect, use, disclose, and protect your
					information when you use our website, mobile app, and
					related services. By accessing or using efly, you agree to
					the practices outlined here.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					2. Information We Collect
				</h2>
				<p>
					We collect both personal and non-personal information
					including:
				</p>
				<ul className='list-disc ml-6 mt-2'>
					<li>Full name, email address, phone number, and address</li>
					<li>
						Passport or national ID details (for visa/flight
						services)
					</li>
					<li>Payment and billing details</li>
					<li>Travel preferences and history</li>
					<li>Device and browser data</li>
					<li>IP address and location information</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					3. How We Use Your Information
				</h2>
				<p>We use your data to:</p>
				<ul className='list-disc ml-6 mt-2'>
					<li>Process bookings, reservations, and payments</li>
					<li>Personalize your user experience</li>
					<li>Provide customer support</li>
					<li>Send transactional and promotional communications</li>
					<li>Improve our platform functionality and performance</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					4. Sharing of Information
				</h2>
				<p>We may share your data with:</p>
				<ul className='list-disc ml-6 mt-2'>
					<li>
						Service providers (e.g., airlines, hotels, visa
						consultants)
					</li>
					<li>Payment gateways for transaction processing</li>
					<li>Legal authorities, if required by law</li>
					<li>
						Marketing and analytics partners (with your consent)
					</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					5. Cookies & Tracking Technologies
				</h2>
				<p>
					We use cookies and similar technologies to improve your
					experience, remember your preferences, analyze usage, and
					serve targeted ads. You can manage cookie settings in your
					browser preferences.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>6. Data Security</h2>
				<p>
					We implement industry-standard security measures to protect
					your personal information. Despite this, no system can be
					100% secure, so we recommend safeguarding your login
					credentials.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>7. Your Rights</h2>
				<p>You have the right to:</p>
				<ul className='list-disc ml-6 mt-2'>
					<li>Access or correct your personal data</li>
					<li>Request data deletion</li>
					<li>Withdraw consent at any time</li>
					<li>Opt out of marketing emails</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					8. Data Retention
				</h2>
				<p>
					We retain your data as long as your account is active or as
					needed to provide services and comply with legal
					obligations. Once data is no longer required, we securely
					delete or anonymize it.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					9. Children’s Privacy
				</h2>
				<p>
					efly does not knowingly collect personal information from
					children under the age of 13. If we become aware that a
					child has provided us with personal data, we will take steps
					to delete such information.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					10. Updates to This Policy
				</h2>
				<p>
					We may update this Privacy Policy from time to time. Any
					changes will be reflected on this page, and we will notify
					you if the changes are significant.
				</p>
			</section>

			<section>
				<h2 className='text-xl font-semibold mb-2'>11. Contact Us</h2>
				<p>
					If you have questions about this Privacy Policy or our data
					practices, please contact us at:
				</p>
				<p className='mt-2'>
					<strong>Email:</strong>{' '}
					<a
						href='mailto:support@efly.com'
						className='text-blue-600 underline'
					>
						support@efly.com
					</a>
				</p>
			</section>
		</main>
	)
}

export default PrivacyPolicyPage
