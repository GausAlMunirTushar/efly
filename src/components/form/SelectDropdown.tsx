'use client'

type SelectDropdownProps<T extends string | number> = {
	value: T
	onChange: (value: T) => void
	options: T[]
}

const SelectDropdown = <T extends string | number>({
	value,
	onChange,
	options
}: SelectDropdownProps<T>) => (
	<select
		value={value}
		onChange={e => onChange(e.target.value as T)}
		className='bg-transparent outline-none'
	>
		{options.map(option => (
			<option key={option} value={option}>
				{option}
			</option>
		))}
	</select>
)

export default SelectDropdown
