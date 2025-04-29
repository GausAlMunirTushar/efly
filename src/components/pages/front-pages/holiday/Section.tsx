'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/utils/utils'

interface SectionProps {
	title: string
	content?: string
}

export default function Section({ title, content }: SectionProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='border-b'>
			<button
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center justify-between w-full py-4 text-left text-lg font-semibold text-primary hover:text-primary/90 transition-colors'
			>
				<span>{title}</span>
				{isOpen ? (
					<ChevronUp className='w-5 h-5' />
				) : (
					<ChevronDown className='w-5 h-5' />
				)}
			</button>
			{isOpen && content && (
				<div className='pb-4 text-muted-foreground text-sm leading-relaxed'>
					{content}
				</div>
			)}
		</div>
	)
}
