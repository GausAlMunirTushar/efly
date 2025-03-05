import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Editor: React.FC = () => {
	const [content, setContent] = useState('')

	return (
		<div className='max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg'>
			<ReactQuill
				theme='snow'
				value={content}
				onChange={setContent}
				className='bg-white'
			/>
			<div className='mt-4 p-2 border rounded bg-gray-100'>
				<h3 className='text-lg font-semibold'>Preview:</h3>
				<div
					dangerouslySetInnerHTML={{ __html: content }}
					className='p-2'
				/>
			</div>
		</div>
	)
}

export default Editor
