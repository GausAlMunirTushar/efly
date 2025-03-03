'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, UploadCloud } from 'lucide-react'
import Image from 'next/image'

const ImageUploader = () => {
	const [images, setImages] = useState<File[]>([])

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages(prev => [...prev, ...acceptedFiles])
	}, [])

	const removeImage = (index: number) => {
		setImages(prev => prev.filter((_, i) => i !== index))
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		multiple: true
	})

	return (
		<div className='max-w-lg mx-auto p-4'>
			{/* Drag & Drop Box */}
			<div
				{...getRootProps()}
				className={`border-2 border-dashed p-6 rounded-lg text-center transition-all cursor-pointer ${
					isDragActive
						? 'border-primary-500 bg-primary-100 dark:bg-gray-800'
						: 'border-gray-300 dark:border-gray-600'
				}`}
			>
				<input {...getInputProps()} />
				<UploadCloud className='w-10 h-10 mx-auto text-gray-500' />
				<p className='text-gray-600 dark:text-gray-300'>
					{isDragActive
						? 'Drop the images here...'
						: 'Drag & drop images here or click to upload'}
				</p>
				<span className='text-sm text-gray-400'>
					Only image files are allowed
				</span>
			</div>

			{/* Image Preview */}
			{images.length > 0 && (
				<div className='mt-4 grid grid-cols-3 gap-3'>
					{images.map((file, index) => (
						<div key={index} className='relative group'>
							<Image
								width={100}
								height={100}
								src={URL.createObjectURL(file)}
								alt='Uploaded'
								className='w-full h-24 object-cover rounded-md shadow'
							/>
							<button
								type='button'
								className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition'
								onClick={() => removeImage(index)}
								aria-label='Remove image'
							>
								<X className='w-4 h-4' />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default ImageUploader
