import React from 'react'

const AboutPage = () => {
	return (
		<main className='max-w-4xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>About efly</h1>

			<section className='mb-6'>
				<p className='text-lg'>
					{`Welcome to ${(<strong>efly</strong>)} — your one-stop digital
					travel platform designed to make booking flights, hotels,
					holidays, visas, and more as seamless as possible. Whether
					you're planning a family vacation, a business trip, or a
					spiritual journey like Umrah, efly is here to help you fly
					smarter, stay better, and explore deeper.`}
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>Our Mission</h2>
				<p>
					At efly, our mission is to simplify travel through
					technology. We believe everyone deserves a personalized,
					stress-free travel experience powered by intelligent tools
					and human-first design.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>What We Offer</h2>
				<ul className='list-disc ml-6 mt-2'>
					<li>
						✅ Flight search and bookings across global and regional
						airlines
					</li>
					<li>
						🏨 Hotel reservations with real-time availability and
						deals
					</li>
					<li>
						🌍 Tailored holiday packages for families, couples, and
						solo travelers
					</li>
					<li>📄 Visa assistance and processing services</li>
					<li>🕋 Special Umrah travel planning and support</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>Why Choose efly?</h2>
				<ul className='list-disc ml-6 mt-2'>
					<li>💡 Easy-to-use interface and smart filters</li>
					<li>🔒 Secure payment processing</li>
					<li>📞 24/7 customer support</li>
					<li>📱 Mobile-friendly experience</li>
					<li>🚀 Fast, reliable, and constantly evolving features</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>Our Vision</h2>
				<p>
					We envision a world where technology bridges the gap between
					people and destinations. With efly, we aim to be more than
					just a travel platform — we strive to become your trusted
					travel companion.
				</p>
			</section>

			<section>
				<h2 className='text-xl font-semibold mb-2'>Connect With Us</h2>
				<p>
					We’re always here to listen, help, and improve. Got
					feedback, partnership ideas, or just want to say hi? Reach
					out to us at:
				</p>
				<p className='mt-2'>
					<strong>Email:</strong>{' '}
					<a
						href='mailto:contact@efly.com'
						className='text-blue-600 underline'
					>
						contact@efly.com
					</a>
				</p>
			</section>
		</main>
	)
}

export default AboutPage
