import React, { useState, useRef } from 'react'

interface TagInputProps {
	value: string
	onChange: (tags: string) => void
	maxTags?: number // Max tags allowed
	maxTagLength?: number // Max length per tag
}

const TagInput: React.FC<TagInputProps> = ({
	value,
	onChange,
	maxTags = 100,
	maxTagLength = 50
}) => {
	const [inputValue, setInputValue] = useState<string>('')
	const inputRef = useRef<HTMLInputElement>(null)

	const tags = value ? value.split(',').filter(tag => tag.trim() !== '') : []

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === ' ' || e.key === ',' || e.key === 'Enter') {
			e.preventDefault()
			const trimmedValue = inputValue.trim()

			if (
				trimmedValue &&
				!tags.includes(trimmedValue) &&
				tags.length < maxTags
			) {
				onChange([...tags, trimmedValue].join(', '))
			}

			setInputValue('')
		}

		if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
			handleDelete(tags[tags.length - 1])
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value

		if (newValue.length <= maxTagLength) {
			setInputValue(newValue)
		}
	}

	const handleDelete = (tag: string) => {
		const newTags = tags.filter(item => item !== tag)
		onChange(newTags.join(', '))
	}

	const handleBlur = () => {
		if (inputValue.trim()) {
			handleKeyDown({
				key: 'Enter',
				preventDefault: () => {}
			} as React.KeyboardEvent)
		}
	}

	return (
		<div className='p-4 border rounded-lg w-full bg-gray-50'>
			<div className='flex flex-wrap gap-2'>
				{tags.map((tag, index) => (
					<span
						key={index}
						className='bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center'
					>
						{tag}
						<button
							type='button'
							onClick={() => handleDelete(tag)}
							className='ml-2 text-gray-500 hover:text-red-600'
						>
							&times;
						</button>
					</span>
				))}
			</div>
			{tags.length < maxTags && (
				<input
					ref={inputRef}
					type='text'
					value={inputValue}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
					placeholder='Add a tag...'
					className='w-full mt-2 p-2 border rounded-lg'
				/>
			)}
			<p className='text-xs text-gray-500 mt-2'>
				{tags.length}/{maxTags} tags added
			</p>
		</div>
	)
}

export default TagInput
