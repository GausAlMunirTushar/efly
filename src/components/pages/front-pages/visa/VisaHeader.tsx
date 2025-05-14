type VisaHeaderProps = {
	country: string
	imageUrl: string
}

export default function VisaHeader({ country, imageUrl }: VisaHeaderProps) {
	return (
		<div
			className='relative w-full h-60 bg-cover bg-center'
			style={{ backgroundImage: `url(${imageUrl})` }}
		>
			<div className='absolute inset-0 bg-black opacity-50'></div>
			<div className='relative z-10 flex items-center justify-center h-full'>
				<h1 className='text-4xl text-white font-semibold'>
					Visa Requirements for {country}
				</h1>
			</div>
		</div>
	)
}
