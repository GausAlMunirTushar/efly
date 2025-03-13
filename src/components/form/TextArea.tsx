import React from 'react'
import { cn } from '@/utils/utils'

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: string
	resizable?: boolean
	fullWidth?: boolean
}

const TextArea: React.FC<TextAreaProps> = ({
	label,
	error,
	resizable = true,
	fullWidth = true,
	className,
	...props
}) => {
	return (
		<div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
			{label && (
				<label className='text-sm font-medium'>
					{label}
					{props.required && <span className='text-red-500'>*</span>}
				</label>
			)}

			<textarea
				{...props}
				className={cn(
					'w-full rounded-md border border-gray-300 bg-white dark:bg-body_dark px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all',
					!resizable && 'resize-none',
					error &&
						'border-red-500 focus:border-red-500 focus:ring-red-500',
					className
				)}
			/>

			{error && <p className='text-sm text-red-500'>{error}</p>}
		</div>
	)
}

export default TextArea
