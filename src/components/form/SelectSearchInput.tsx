'use client'

import { useState, useRef, useEffect } from 'react'

type Location = {
	code: string
	name: string
}

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
}: SelectInputProps) => {
	const [query, setQuery] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [highlightedIndex, setHighlightedIndex] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)

	const filteredOptions = options.filter(
		opt =>
			opt.name.toLowerCase().includes(query.toLowerCase()) ||
			opt.code.toLowerCase().includes(query.toLowerCase())
	)

	// Find the selected option based on the value
	const selectedOption = options.find(opt => opt.code === value)

	// Close dropdown on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault()
			setHighlightedIndex(prev =>
				Math.min(prev + 1, filteredOptions.length - 1)
			)
		} else if (e.key === 'ArrowUp') {
			e.preventDefault()
			setHighlightedIndex(prev => Math.max(prev - 1, 0))
		} else if (e.key === 'Enter') {
			e.preventDefault()
			const option = filteredOptions[highlightedIndex]
			if (option) {
				onChange(option.code)
				setQuery('')
				setIsOpen(false)
			}
		} else if (e.key === 'Escape') {
			setIsOpen(false)
		}
	}

	return (
		<div className='relative w-full' ref={containerRef}>
			<div
				className='border border-gray-300 bg-white rounded-lg px-4 py-2 cursor-pointer shadow-sm'
				onClick={() => {
					setIsOpen(!isOpen)
					setHighlightedIndex(0)
				}}
				role='combobox'
				aria-expanded={isOpen}
				aria-haspopup='listbox'
				aria-owns='location-listbox'
			>
				<label className='block text-xs font-semibold text-gray-600 mb-1'>
					{label}
				</label>
				<div className='text-sm font-bold text-indigo-800'>
					{selectedOption?.name
						? selectedOption.name.split(',')[0]
						: 'Select location'}
				</div>
				<div className='text-sm text-gray-600 truncate'>
					{selectedOption?.name
						? selectedOption.name.split(',').slice(1).join(', ')
						: ''}
				</div>
				<div className='text-xs text-gray-500'>
					{selectedOption?.name}
				</div>
			</div>

			{isOpen && (
				<div
					className='absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg'
					role='listbox'
					id='location-listbox'
				>
					<input
						type='text'
						value={query}
						onChange={e => {
							setQuery(e.target.value)
							setHighlightedIndex(0)
						}}
						onKeyDown={handleKeyDown}
						placeholder='Type to search'
						className='w-full px-4 py-2 border-b border-gray-200 text-sm outline-none'
						aria-autocomplete='list'
						aria-controls='location-listbox'
					/>

					<div className='max-h-60 overflow-y-auto'>
						{filteredOptions.length > 0 ? (
							filteredOptions.map((opt, index) => (
								<div
									key={opt.code}
									role='option'
									aria-selected={value === opt.code}
									className={`px-4 py-3 cursor-pointer ${
										highlightedIndex === index
											? 'bg-indigo-100'
											: 'hover:bg-indigo-50'
									}`}
									onMouseEnter={() =>
										setHighlightedIndex(index)
									}
									onClick={() => {
										onChange(opt.code)
										setIsOpen(false)
										setQuery('')
									}}
								>
									<div className='text-sm font-semibold text-indigo-800'>
										{opt.name}
									</div>
								</div>
							))
						) : (
							<div className='px-4 py-3 text-sm text-gray-500'>
								No options found.
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default SelectSearchInput
