'use client'

type Location = { code: string; name: string }

type SelectInputProps = {
	label: string
	value: string
	onChange: (value: string) => void
	options: Location[]
}

const SelectSearchInput = ({
	label,
	value,
	onChange,
	options
}: SelectInputProps) => (
	<div className='border p-3 rounded-md'>
		<label className='text-sm text-gray-600'>{label}</label>
		<select
			value={value}
			onChange={e => onChange(e.target.value)}
			className='w-full mt-1 bg-transparent outline-none'
		>
			{options.map(opt => (
				<option key={opt.code} value={opt.code}>
					{opt.name}
				</option>
			))}
		</select>
	</div>
)

export default SelectSearchInput
