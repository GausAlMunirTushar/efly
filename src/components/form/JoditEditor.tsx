'use client'

import { useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'

const JoditEditor = dynamic(() => import('jodit-react'), {
	ssr: false
})

interface JoditEditProps {
	value: string
	onChange: (newContent: string) => void
	placeholder?: string
}

export default function JoditEdit({
	value,
	onChange,
	placeholder
}: JoditEditProps) {
	const editor = useRef(null)

	const config = useMemo(
		() => ({
			readonly: false,
			placeholder: placeholder || 'Start typing...'
		}),
		[placeholder]
	)

	return (
		<JoditEditor
			ref={editor}
			value={value}
			config={config}
			onBlur={(newContent: string) => onChange(newContent)}
		/>
	)
}
