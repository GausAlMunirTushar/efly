'use client'

type DateInputProps = {
	label: string
	value: string
	onChange: (value: string) => void
}

const DateInput = ({ label, value, onChange }: DateInputProps) => (
	<div className='border p-3 rounded-md'>
		<label className='text-sm text-gray-600'>{label}</label>
		<input
			type='date'
			value={value}
			onChange={e => onChange(e.target.value)}
			className='w-full mt-1 bg-transparent outline-none'
		/>
	</div>
)

export default DateInput
