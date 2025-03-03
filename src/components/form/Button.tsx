import { cn } from '@/utils/utils'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'outline' | 'danger'
	size?: 'sm' | 'md' | 'lg'
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	isLoading?: boolean
}

const Button = ({
	variant = 'primary',
	size = 'md',
	leftIcon,
	rightIcon,
	isLoading,
	disabled,
	children,
	className,
	...props
}: ButtonProps) => {
	const baseStyles =
		'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'

	const variantStyles = {
		primary: 'bg-primary-500 text-white hover:bg-primary-600 ',
		secondary: 'bg-gray-600 text-white hover:bg-gray-700',
		outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
		danger: 'bg-red-600 text-white hover:bg-red-700'
	}

	const sizeStyles = {
		sm: 'px-3 py-1 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	}

	return (
		<button
			className={cn(
				baseStyles,
				variantStyles[variant],
				sizeStyles[size],
				className
			)}
			disabled={isLoading || disabled}
			{...props}
		>
			{isLoading ? (
				<Loader2 className='animate-spin w-5 h-5' />
			) : (
				<>
					{leftIcon && <span className='mr-2'>{leftIcon}</span>}
					{children}
					{rightIcon && <span className='ml-2'>{rightIcon}</span>}
				</>
			)}
		</button>
	)
}

export default Button
