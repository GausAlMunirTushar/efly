'use client'

import React, { useState } from 'react'

type FAQItem = {
	question: React.ReactNode
	answer: React.ReactNode
}

type FAQCategory = {
	id: string
	label: string
	faqs: FAQItem[]
}

const categories: FAQCategory[] = [
	{
		id: 'flight',
		label: 'Flight',
		faqs: [
			{
				question: (
					<>
						<strong>
							Q: I have a debit card. May I use my debit card to
							book a flight from efly?
						</strong>
						<br />
						<b>প্রশ্ন:</b> আমার ডেবিট কার্ড আছে। আমি কি ডেবিট কার্ড
						ব্যবহার করে efly থেকে ফ্লাইট বুক করতে পারব?
					</>
				),
				answer: (
					<>
						<p>
							<strong>A:</strong> Yes, you can easily book a
							flight with any local or international card, debit
							or even your credit card.
						</p>
						<p>
							<b>উত্তর:</b> হ্যাঁ, আপনি আপনার লোকাল কিংবা
							ইন্টারন্যাশনাল কার্ড, ডেবিট অথবা ক্রেডিট কার্ডই
							ব্যবহার করে efly থেকে খুব সহজেই ফ্লাইট বুক করতে
							পারবেন।
						</p>
					</>
				)
			},
			{
				question: (
					<>
						<strong>
							Q. Can you book a domestic flight on efly?
						</strong>
						<br />
						<b>প্রশ্ন:</b> আমি কি efly থেকে ডোমেস্টিক ফ্লাইট বুক
						করতে পারব?
					</>
				),
				answer: (
					<>
						<p>
							<strong>A:</strong> Yes, we provide both domestic
							and international flight services. Please let us
							know your travel plan to assist you in finding the
							preferred flight.
						</p>
						<p>
							<b>উত্তর:</b> হ্যাঁ, পারেন। আমরা ডোমেস্টিক এবং
							ইন্টারন্যাশনাল, উভয় ধরনের ফ্লাইট সার্ভিস দিয়ে
							থাকি। আমরা আপনারে আপনার যাত্রা পরিকল্পনা অনুযায়ী
							পছন্দের ফ্লাইট বেছে নিতে সাহায্য করতে পারি।
						</p>
					</>
				)
			},
			{
				question: (
					<>
						<strong>
							Q: Can I make the payment later for an online
							booking on efly?
						</strong>
						<br />
						<b>প্রশ্ন:</b> অনলাইন বুকিং -এর ক্ষেত্রে আমি কি পেমেন্ট
						পরে করতে পারি?
					</>
				),
				answer: (
					<>
						<p>
							<strong>A:</strong> Unfortunately, you cannot hold
							the booking unless you pay. You instantly need to
							pay the amount to confirm your purchase made online.
						</p>
						<p>
							<b>উত্তর:</b> দুঃখিত, অনলাইন বুকিং ফ্লাইট আসলেই ও
							টাকা করতে পারবেন কিছু পেমেন্ট না করা পর্যন্ত আপনার
							বুকিং নিশ্চিত হবে না। অনলাইন বুকিং নিশ্চিত করতে
							তাত্ক্ষণিক পেমেন্ট অপরিহার্য।
						</p>
					</>
				)
			},
			{
				question: (
					<>
						<strong>
							Q. May I have a hard-copy receipt sent by post?
						</strong>
						<br />
						<b>প্রশ্ন:</b> আমি কি ডাকযোগে রিসিপ্টের হার্ড কপি সংগ্রহ
						করতে পারি? / আমাকে কি ডাকযোগে রিসিপ্টের হার্ড কপি pathan
						হবে?
					</>
				),
				answer: (
					<>
						<p>
							<strong>A:</strong>{' '}
							{`We don't send hard copy receipts
							by post. We will email your booking details and
							confirmation to you. Alternatively, you can come to
							our office for a hard copy of your purchase, and we
							will provide the hard copy to you.`}
						</p>
						<p>
							<b>উত্তর:</b> দুঃখিত, ডাকযোগে রিসিপ্টের হার্ড কপি
							পাঠানো হয় না। আমরা ই-মেইলের মাধ্যমে বুকিং নিশ্চিত
							সংক্রান্ত বিস্তারিত পাঠিয়ে থাকি। তবে, আপনি সরাসরি
							আমাদের অফিস থেকে রিসিপ্টের হার্ড কপি সংগ্রহ করতে
							পারেন।
						</p>
					</>
				)
			},
			{
				question: (
					<>
						<strong>
							Q: Will it cost any extra charge if I purchase
							through a card from efly?
						</strong>
						<br />
						<b>প্রশ্ন:</b> efly-এ কার্ডের মাধ্যমে বুকিং দিলে কি
						বাড়তি চার্জ পরিশোধ করতে হবে?
					</>
				),
				answer: (
					<>
						<p>
							<strong>A:</strong> During an online or an offline
							transaction there is a convenience fee that
							customers have to pay. However, there is no extra
							charge on anything you purchase from efly be it
							online or offline.
						</p>
						<p>
							<b>উত্তর:</b> অনলাইন বা অফলাইন বুকিংয়ের সময়
							প্রতিটি কনজিউমারিং ফি আছে যা গ্রাহকদের দিতে হবে।
							তবে, efly-এ থেকে, অনলাইন বা অফলাইন বুকিংয়ে, কিছু
							কিনলে কোন অতিরিক্ত চার্জ নেই।
						</p>
					</>
				)
			},
			{
				question: (
					<>
						<strong>Q: What is efly Convenience Fee?</strong>
						<br />
						<b>প্রশ্ন:</b> efly কনভিনিয়েন্স ফি কী?
					</>
				),
				answer: (
					<>
						<p>
							<strong>A:</strong> efly Convenience fee is the
							charge that the customer needs to pay for the
							support, convenience and service that he/she is
							availing from the online platforms.
						</p>
						<p>
							<b>উত্তর:</b> কাস্টমাররা efly থেকে অনলাইন, যেসব
							সহযোগিতা, কনভিনিয়েন্স ও সেবা উপভোগ করেন, তার জন্য
							প্রদেয় চার্জকে efly কনভিনিয়েন্স ফি বলা হয়।
						</p>
					</>
				)
			},
			{
				question: (
					<>
						<strong>
							Q: Is the efly Convenience Fee refundable?
						</strong>
						<br />
						<b>প্রশ্ন:</b> efly কনভিনিয়েন্স ফি কী ফেরতযোগ্য?
					</>
				),
				answer: (
					<>
						<p>
							<strong>A:</strong> efly Convenience Fee is
							non-refundable.
						</p>
						<p>
							<b>উত্তর:</b> দুঃখিত, efly কনভিনিয়েন্স ফি ফেরতযোগ্য
							নয়।
						</p>
					</>
				)
			}
		]
	},
	{
		id: 'hotel',
		label: 'Hotel',
		faqs: [
			{
				question: 'Hotel FAQ example question 1',
				answer: 'Hotel FAQ example answer 1'
			}
			// add real FAQs here...
		]
	},
	{
		id: 'holiday',
		label: 'Holiday',
		faqs: [
			{
				question: 'Holiday FAQ example question 1',
				answer: 'Holiday FAQ example answer 1'
			}
		]
	},
	{
		id: 'visa',
		label: 'Visa',
		faqs: [
			{
				question: 'Visa FAQ example question 1',
				answer: 'Visa FAQ example answer 1'
			}
		]
	}
]

const FAQPage = () => {
	const [activeCategory, setActiveCategory] = useState<string>('flight')

	const category = categories.find(c => c.id === activeCategory)

	return (
		<main>
			<div className='flex items-center justify-center bg-[#0058A8] h-36'>
				<h1 className='text-4xl font-bold text-white mb-6'>FAQ</h1>
			</div>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen'>
				<div className='flex flex-col md:flex-row gap-8'>
					{/* Left sidebar */}
					<nav className='flex flex-col w-full max-w-xs space-y-2 md:sticky md:top-20 md:h-[calc(100vh-80px)]'>
						{categories.map(({ id, label }) => (
							<button
								key={id}
								onClick={() => setActiveCategory(id)}
								className={`text-left px-4 py-2 rounded border transition-colors ${
									activeCategory === id
										? 'bg-[#0058A8] text-white border-blue-600'
										: 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
								}`}
							>
								{label}
							</button>
						))}
					</nav>

					{/* Right content */}
					<section className='flex-1'>
						<p className='mb-6 text-gray-700 max-w-prose'>
							We have put together some of the most common
							questions that we get asked a lot. Please check
							through the categories to get your answer without
							any delay.
						</p>

						{category && (
							<>
								<h2 className='text-2xl font-bold mb-6'>
									{category.label}
								</h2>
								<div className='space-y-8'>
									{category.faqs.map(
										({ question, answer }, idx) => (
											<article
												key={idx}
												className='max-w-prose'
											>
												<div className='mb-2'>
													{question}
												</div>
												<div className='text-gray-800 whitespace-pre-line'>
													{answer}
												</div>
											</article>
										)
									)}
								</div>
							</>
						)}
					</section>
				</div>
			</div>
		</main>
	)
}

export default FAQPage
