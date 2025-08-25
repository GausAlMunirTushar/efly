'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import Button from '../form/Button'

const ImageUploader = ({
	onImageUpload
}: {
	onImageUpload: (imageUrl: string) => void
}) => {
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

	const handleImageUpload = async () => {
		if (images.length === 0) return

		const formData = new FormData()
		formData.append('file', images[0]) // Assume uploading the first image

		try {
			const res = await fetch('/api/upload-image', {
				method: 'POST',
				body: formData
			})
			const data = await res.json()

			if (data?.imageUrl) {
				onImageUpload(data.imageUrl)
			} else {
				console.error('Image upload failed')
			}
		} catch (error) {
			console.error('Error uploading image:', error)
		}
	}

	return (
		<div className='max-w-lg mx-auto p-4'>
			{/* Drag & Drop Box */}
			<div
				{...getRootProps()}
				className={`border-2 border-dashed p-6 rounded-lg text-center transition-all cursor-pointer ${isDragActive ? 'border-primary-500 bg-primary-100' : 'border-gray-300'}`}
			>
				<input {...getInputProps()} />
				<UploadCloud className='w-10 h-10 mx-auto text-gray-500' />
				<p className='text-gray-600'>
					{isDragActive
						? 'Drop the image here...'
						: 'Drag & drop images here or click to upload'}
				</p>
				<span className='text-sm text-gray-400'>
					Only image files are allowed
				</span>
			</div>

			{/* Image Preview */}
			{images.length > 0 && (
				<div className='my-4 grid grid-cols-3 gap-3'>
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

			{/* Upload Button */}
			<Button
				size='sm'
				className='w-full mt-2'
				type='button'
				onClick={handleImageUpload}
			>
				Upload Image
			</Button>
		</div>
	)
}

export default ImageUploader
