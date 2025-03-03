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
	const [isOpen, setIsOpen] = useState(false)
	const [selectedValue, setSelectedValue] = useState<string | undefined>(
		value
	)
	const selectRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (value !== undefined) {
			setSelectedValue(value)
		}
	}, [value])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () =>
			document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleSelect = (selected: string) => {
		setSelectedValue(selected)
		onChange?.(selected)
		setIsOpen(false)
	}

	return (
		<div className={cn('relative', fullWidth && 'w-full')}>
			{label && (
				<label className='text-sm font-medium'>
					{label}{' '}
					{required ? <span className='text-red-500'>*</span> : ''}
				</label>
			)}

			<div
				ref={selectRef}
				className={cn(
					'relative w-full border border-gray-300 bg-white dark:bg-body_dark text-sm rounded-md shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all cursor-pointer',
					disabled && 'opacity-50 cursor-not-allowed',
					error && 'border-red-500 focus-within:ring-red-500',
					className
				)}
				onClick={() => !disabled && setIsOpen(prev => !prev)}
			>
				<div className='flex items-center justify-between px-3 py-2'>
					<span
						className={cn(
							'truncate',
							!selectedValue && 'text-gray-500'
						)}
					>
						{selectedValue
							? options.find(opt => opt.value === selectedValue)
									?.label
							: placeholder}
					</span>
					<ChevronDown className='h-5 w-5 text-gray-500' />
				</div>

				{/* Dropdown */}
				{isOpen && (
					<ul className='absolute left-0 top-full mt-1 w-full bg-white dark:bg-body_dark border border-gray-200 shadow-md rounded-md max-h-48 overflow-y-auto z-10'>
						{options.map(option => (
							<li
								key={option.value}
								className={cn(
									'px-3 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-bg_dark transition-all',
									selectedValue === option.value &&
										'bg-blue-100 dark:bg-bg_dark'
								)}
								onClick={() => handleSelect(option.value)}
							>
								{option.label}
							</li>
						))}
					</ul>
				)}
			</div>

			{error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
		</div>
	)
}

export default SelectInput
