interface HolidayDetailsProps {
	packageDetails: {
		title: string
		description: string
		location: { name: string }
		nightsInfo: string
		price: number
		tags: string[]
	}
}

export default function HolidayDetails({
	packageDetails
}: HolidayDetailsProps) {
	return (
		<div className='p-4 space-y-4'>
			<h2 className='text-2xl font-bold'>{packageDetails.title}</h2>
			<p>{packageDetails.description}</p>
			<p>
				<strong>Location:</strong>{' '}
				{packageDetails.location?.name || 'Unknown'}
			</p>
			<p>
				<strong>Duration:</strong> {packageDetails.nightsInfo}
			</p>
			<p>
				<strong>Price:</strong> ৳{packageDetails.price}
			</p>

			{packageDetails.tags.length > 0 && (
				<div>
					<strong>Tags:</strong>{' '}
					{packageDetails.tags.map((tag, index) =>
						tag.trim() ? (
							<span
								key={index}
								className='inline-block bg-gray-200 px-2 py-1 rounded mr-2 text-sm'
							>
								{tag}
							</span>
						) : null
					)}
				</div>
			)}
		</div>
	)
}
