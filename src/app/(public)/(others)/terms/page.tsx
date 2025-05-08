const TermsAndConditionsPage = () => {
	return (
		<main className='contianer mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>Terms & Conditions</h1>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>1. Introduction</h2>
				<p>
					{`Welcome to efly! By using our website, mobile application,
					or any related services (collectively referred to as
					"Platform"), you agree to the following terms and
					conditions. Please read them carefully before continuing to
					use our services.`}
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					2. User Responsibilities
				</h2>
				<p>
					You are responsible for maintaining the confidentiality of
					your account and for all activities that occur under your
					login credentials. You agree to provide accurate and
					complete information and to update it when necessary.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					3. Booking and Payment
				</h2>
				<p>
					All bookings made through efly are subject to availability
					and confirmation from our partnered service providers. You
					authorize efly to process payments via your selected payment
					method. Prices are inclusive of applicable taxes unless
					otherwise stated.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					4. Changes and Cancellations
				</h2>
				<p>
					Any changes or cancellations to bookings must comply with
					the policies of the respective service providers (airlines,
					hotels, etc.). efly is not liable for any additional fees
					incurred due to modifications or cancellations.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					5. Prohibited Activities
				</h2>
				<p>
					You agree not to use our platform for any illegal,
					unauthorized, or harmful purposes. Activities such as
					fraudulent booking, abuse of promotions, or attempts to hack
					the system may lead to suspension or permanent termination
					of your account.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					6. Intellectual Property
				</h2>
				<p>
					All content on efly, including logos, text, graphics, and
					software, is owned or licensed by efly and is protected
					under intellectual property laws. You may not reproduce or
					redistribute any content without written permission.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					7. Limitation of Liability
				</h2>
				<p>
					efly acts as an intermediary between users and third-party
					providers. We are not responsible for service quality,
					cancellations, delays, or disputes. Our liability is limited
					to the extent permitted by law.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					8. Privacy Policy
				</h2>
				<p>
					Your use of efly is also governed by our Privacy Policy,
					which explains how we collect, store, and protect your
					personal information. By using efly, you consent to our data
					practices.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>9. Termination</h2>
				<p>
					efly reserves the right to suspend or terminate access to
					its services for users who violate these terms or engage in
					suspicious or harmful activity.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>
					10. Updates to Terms
				</h2>
				<p>
					We may update these Terms & Conditions from time to time.
					Continued use of our services after changes are posted means
					you accept the revised terms.
				</p>
			</section>

			<section>
				<h2 className='text-xl font-semibold mb-2'>11. Contact Us</h2>
				<p>
					If you have any questions or concerns regarding these Terms
					& Conditions, please contact our support team at{' '}
					<a
						href='mailto:support@efly.com'
						className='text-blue-600 underline'
					>
						support@efly.com
					</a>
					.
				</p>
			</section>
		</main>
	)
}

export default TermsAndConditionsPage
