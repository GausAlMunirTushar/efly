'use client'

import Section from './Section'

const sections = [
	{
		key: 'overview',
		title: 'Overview',
		content: `This three day two nights romantic retreat with your loved ones in Cox’s Bazar will be enjoyable. Be prepared for the hypnotizing view of the sea beaches and the mountains of Cox’s Bazar. Experience a beach holiday like never before on this vacation to Cox’s Bazar.`
	},
	{ key: 'location', title: 'Location' },
	{ key: 'timing', title: 'Timing' },
	{ key: 'inclusion-exclusion', title: 'Inclusion & Exclusion' },
	{ key: 'description', title: 'Description' },
	{ key: 'additional-info', title: 'Additional Information' },
	{ key: 'travel-tips', title: 'Travel Tips' },
	{ key: 'options', title: 'Options' },
	{ key: 'policy', title: 'Policy' }
]

export default function HolidayDetails() {
	return (
		<div className=' mx-auto px-4 py-6'>
			<div className='flex space-x-4 border-b mb-6'>
				<button className='py-2 px-4 border-b-2 border-primary font-medium text-primary'>
					Holiday Details
				</button>
			</div>
			{sections.map(section => (
				<Section
					key={section.key}
					title={section.title}
					content={section.content}
				/>
			))}
		</div>
	)
}
