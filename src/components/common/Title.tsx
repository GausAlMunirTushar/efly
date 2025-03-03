import { cn } from '@/utils/utils'

interface TitleProps {
	children: React.ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xl'
	weight?: 'light' | 'normal' | 'bold'
	align?: 'left' | 'center' | 'right'
	color?: 'primary' | 'secondary' | 'muted' | 'white' | 'black'
}

const Title: React.FC<TitleProps> = ({
	children,
	size = 'lg',
	weight = 'bold',
	align = 'left',
	color = 'primary'
}) => {
	const sizeClasses = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-xl',
		xl: 'text-2xl'
	}

	const weightClasses = {
		light: 'font-light',
		normal: 'font-normal',
		bold: 'font-bold'
	}

	const colorClasses = {
		primary: 'text-primary dark:text-text-primary',
		secondary: 'text-text-secondary dark:text-gray-300',
		muted: 'text-text-muted dark:text-gray-400',
		white: 'text-white',
		black: 'text-black dark:text-gray-100'
	}

	return (
		<h2
			className={cn(
				sizeClasses[size],
				weightClasses[weight],
				colorClasses[color],
				`text-${align}`
			)}
		>
			{children}
		</h2>
	)
}

export default Title
