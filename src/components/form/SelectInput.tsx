import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/utils' // Utility function for Tailwind class merging

interface Option {
	value: string
	label: string
}

interface SelectProps {
	label?: string
	options: Option[]
	value?: string
	onChange?: (value: string) => void
	placeholder?: string
	error?: string
	fullWidth?: boolean
	required?: boolean
	disabled?: boolean
	className?: string
}

const SelectInput: React.FC<SelectProps> = ({
	label,
	options,
	value,
	onChange,
	placeholder = 'Select an option',
	error,
	fullWidth,
	required,
	disabled,
	className
}) => {
	const [selectedValue, setSelectedValue] = useState<string | undefined>(
		value
	)
	const selectRef = useRef<HTMLSelectElement>(null)

	useEffect(() => {
		if (value !== undefined) {
			setSelectedValue(value)
		}
	}, [value])

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selected = event.target.value
		setSelectedValue(selected)
		onChange?.(selected)
	}

	return (
		<div className={cn('relative', fullWidth && 'w-full', className)}>
			{label && (
				<label
					htmlFor='select-input'
					className='text-sm font-medium block mb-2'
				>
					{label}{' '}
					{required && <span className='text-red-500'>*</span>}
				</label>
			)}

			<div
				className={cn(
					'relative w-full border border-gray-300 bg-white dark:bg-body_dark text-sm rounded-md shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all',
					disabled && 'opacity-50 cursor-not-allowed',
					error && 'border-red-500 focus-within:ring-red-500'
				)}
			>
				<select
					id='select-input'
					ref={selectRef}
					value={selectedValue}
					onChange={handleSelectChange}
					disabled={disabled}
					className='w-full p-2 pl-3 pr-8 bg-transparent text-sm text-gray-800 dark:text-white focus:outline-none appearance-none'
					aria-required={required}
					aria-invalid={!!error}
					aria-describedby={error ? 'select-error' : undefined}
				>
					<option value='' disabled hidden>
						{placeholder}
					</option>
					{options.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
			</div>

			{error && (
				<p id='select-error' className='text-sm text-red-500 mt-1'>
					{error}
				</p>
			)}
		</div>
	)
}

export default SelectInput
