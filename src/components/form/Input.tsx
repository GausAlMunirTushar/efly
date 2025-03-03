import React, { useState } from 'react'
import { cn } from '@/utils/utils' // Tailwind merge utility
import { LucideIcon, Eye, EyeOff } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	icon?: LucideIcon
	fullWidth?: boolean
}

const Input: React.FC<InputProps> = ({
	label,
	error,
	icon: Icon,
	fullWidth,
	required,
	className,
	type,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const isPassword = type === 'password'

	return (
		<div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
			{label && (
				<label className='text-sm font-medium'>
					{label}{' '}
					{required && <span className='text-red-500'>*</span>}
				</label>
			)}

			<div className='relative'>
				{Icon && (
					<Icon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500' />
				)}
				<input
					{...props}
					type={
						isPassword ? (showPassword ? 'text' : 'password') : type
					}
					className={cn(
						'w-full rounded-md border border-gray-300 bg-white dark:bg-body_dark px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all',
						Icon && 'pl-10', // Adjust padding if an icon is present
						isPassword && 'pr-10', // Adjust padding if password toggle exists
						error &&
							'border-red-500 focus:border-red-500 focus:ring-red-500',
						className
					)}
				/>
				{isPassword && (
					<button
						type='button'
						onClick={() => setShowPassword(prev => !prev)}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none'
					>
						{showPassword ? (
							<EyeOff className='h-4 w-4' />
						) : (
							<Eye className='h-4 w-4' />
						)}
					</button>
				)}
			</div>

			{error && <p className='text-sm text-red-500'>{error}</p>}
		</div>
	)
}

export default Input
