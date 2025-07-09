'use client'

type SelectInputProps = {
	label: string
	value: string
}

const UmrahSearchInput = ({ label, value }: SelectInputProps) => {
	return (
		<div className='border border-gray-300 bg-white rounded-lg px-4 py-2 shadow-sm w-full'>
			<label className='block text-xs font-semibold text-gray-600 mb-1'>
				{label}
			</label>
			<div className='text-xs sm:text-sm font-bold text-primary-500'>
				Umrah - Mecca, Medina
			</div>
		</div>
	)
}

export default UmrahSearchInput
