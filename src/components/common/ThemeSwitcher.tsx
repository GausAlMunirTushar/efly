import { useEffect, useState, useRef } from 'react'
import { Sun, Moon, Laptop } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const { theme, setTheme, systemTheme } = useTheme()

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () =>
			document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const currentTheme = theme === 'system' ? systemTheme : theme

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={() => setDropdownOpen(!dropdownOpen)}
				className='p-2 rounded-full bg-gray-100 dark:bg-bg_dark hover:bg-gray-200 transition'
			>
				{currentTheme === 'dark' ? (
					<Moon className='h-5 w-5 text-gray-600' />
				) : currentTheme === 'light' ? (
					<Sun className='h-5 w-5 text-yellow-500' />
				) : (
					<Laptop className='h-5 w-5 text-gray-600' />
				)}
			</button>

			{dropdownOpen && (
				<div className='absolute right-0 mt-4 w-32 bg-white dark:bg-body_dark shadow-md rounded-lg p-2 border dark:border-bg_dark'>
					<button
						onClick={() => {
							setTheme('light')
							setDropdownOpen(false)
						}}
						className={`flex items-center gap-2 my-1 px-3 py-2 rounded-md w-full hover:bg-gray-100 dark:hover:bg-bg_secondary ${
							currentTheme === 'light'
								? 'bg-gray-100 dark:bg-bg_secondary'
								: ''
						}`}
					>
						<Sun className='h-4 w-4 text-yellow-500' /> Light
					</button>
					<button
						onClick={() => {
							setTheme('dark')
							setDropdownOpen(false)
						}}
						className={`flex items-center gap-2 px-3 py-2 rounded-md w-full hover:bg-gray-100 dark:hover:bg-bg_secondary ${
							currentTheme === 'dark'
								? 'bg-gray-100 dark:bg-bg_secondary'
								: ''
						}`}
					>
						<Moon className='h-4 w-4 text-gray-600' /> Dark
					</button>
					<button
						onClick={() => {
							setTheme('system')
							setDropdownOpen(false)
						}}
						className={`flex items-center my-1 gap-2 px-3 py-2 rounded-md w-full hover:bg-gray-100 dark:hover:bg-bg_secondary ${
							theme === 'system'
								? 'bg-gray-100 dark:bg-bg_secondary'
								: ''
						}`}
					>
						<Laptop className='h-4 w-4 text-gray-600' /> System
					</button>
				</div>
			)}
		</div>
	)
}

export default ThemeSwitcher
