import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface EditorProps {
	label?: string
	value: string
	onChange: (content: string) => void
	placeholder: string
	required?: boolean
	error?: string
}
const Editor: React.FC<EditorProps> = ({
	label,
	value,
	onChange,
	required = false,
	error
}) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image'],
			['clean']
		]
	}

	if (!mounted) return <div className='h-32 bg-gray-100 rounded-lg' /> // Placeholder to prevent mismatch

	return (
		<div className='flex flex-col gap-2'>
			{label && (
				<label className='font-semibold text-gray-700'>
					{label}{' '}
					{required && <span className='text-red-500'>*</span>}
				</label>
			)}
			<ReactQuill
				theme='snow'
				value={value}
				onChange={onChange}
				modules={modules}
				placeholder='Write something...'
			/>
			{error && <p className='text-red-500 text-sm'>{error}</p>}
		</div>
	)
}

export default Editor
