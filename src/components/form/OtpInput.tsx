import React, { useRef, useEffect } from 'react'

interface OtpInputProps {
	length?: number
	value: string
	onChange: (otp: string) => void
	autoFocus?: boolean
	disabled?: boolean
	inputClassName?: string
	containerClassName?: string
}

const OtpInput: React.FC<OtpInputProps> = ({
	length = 6,
	value,
	onChange,
	autoFocus = false,
	disabled = false,
	inputClassName = '',
	containerClassName = ''
}) => {
	// Use useRef to store array of input refs
	const inputsRef = useRef<(HTMLInputElement | null)[]>([])

	useEffect(() => {
		if (autoFocus && inputsRef.current[0]) {
			inputsRef.current[0].focus()
		}
	}, [autoFocus])

	const setInputRef = (el: HTMLInputElement | null, idx: number) => {
		inputsRef.current[idx] = el
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		idx: number
	) => {
		const val = e.target.value.replace(/\D/g, '')
		if (!val) return

		const otpArr = value.split('')
		otpArr[idx] = val[0]
		onChange(otpArr.join(''))

		if (idx < length - 1) {
			inputsRef.current[idx + 1]?.focus()
		}
	}

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		idx: number
	) => {
		const key = e.key

		if (key === 'Backspace') {
			if (value[idx]) {
				const otpArr = value.split('')
				otpArr[idx] = ''
				onChange(otpArr.join(''))
			} else if (idx > 0) {
				inputsRef.current[idx - 1]?.focus()
				const otpArr = value.split('')
				otpArr[idx - 1] = ''
				onChange(otpArr.join(''))
			}
			e.preventDefault()
		} else if (key === 'ArrowLeft' && idx > 0) {
			inputsRef.current[idx - 1]?.focus()
			e.preventDefault()
		} else if (key === 'ArrowRight' && idx < length - 1) {
			inputsRef.current[idx + 1]?.focus()
			e.preventDefault()
		}
	}

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault()
		const paste = e.clipboardData
			.getData('text')
			.replace(/\D/g, '')
			.slice(0, length)
		if (paste) {
			onChange(paste.padEnd(length, ''))
			const focusIndex = Math.min(paste.length, length - 1)
			inputsRef.current[focusIndex]?.focus()
		}
	}

	const inputs = Array.from({ length }).map((_, i) => (
		<input
			key={i}
			type='text'
			inputMode='numeric'
			maxLength={1}
			pattern='\d*'
			autoComplete='one-time-code'
			className={`border rounded-md text-center w-12 h-12 text-xl focus:outline-none focus:ring-2 focus:ring-primary ${inputClassName}`}
			value={value[i] || ''}
			onChange={e => handleChange(e, i)}
			onKeyDown={e => handleKeyDown(e, i)}
			onPaste={handlePaste}
			disabled={disabled}
			aria-label={`OTP Digit ${i + 1}`}
			ref={el => setInputRef(el, i)}
		/>
	))

	return (
		<div className={`flex gap-2 justify-center ${containerClassName}`}>
			{inputs}
		</div>
	)
}

export default OtpInput
