'use client'

import { FaPen } from 'react-icons/fa'

export default function UserProfile() {
	return (
		<div className='max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md'>
			{/* Header Section */}
			<div className='flex justify-between items-start border-b pb-6 mb-6'>
				<div className='flex items-center gap-4'>
					<div className='w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-5xl'>
						{/* Placeholder Avatar */}
						<span className='material-icons text-sm'>person</span>
					</div>
				</div>
				<button className='flex items-center gap-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold px-4 py-2 rounded'>
					<FaPen className='text-xs' />
					Edit Profile
				</button>
			</div>

			{/* Main Info Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Personal Info */}
				<div>
					<h2 className='font-semibold text-lg mb-4'>
						Personal Information
					</h2>
					<InfoItem label='Full Name' value='N/A' />
					<InfoItem label='Gender' value='N/A' />
					<InfoItem label='Date of Birth' value='N/A' />
					<InfoItem label='Nationality' value='N/A' />
					<InfoItem label='Marital Status' value='N/A' />
					<InfoItem label='Religion' value='N/A' />
					<InfoItem label='Present Address' value='N/A' />
					<InfoItem label='Permanent Address' value='N/A' />
				</div>

				{/* Contact Info */}
				<div>
					<h2 className='font-semibold text-lg mb-4'>
						Contact Information
					</h2>
					<InfoItem label='Mobile Number' value='+880 1726814131' />
					<InfoItem
						label='Mail Address'
						value='gausalmunirtushar@gmail.com'
					/>
					<InfoItem label='Passport Number' value='N/A' />
					<InfoItem label='Passport Expiry Date' value='N/A' />
					<div className='mb-2'>
						<span className='font-medium text-gray-700'>
							Passport Image
						</span>
						<div className='mt-2 w-full h-36 border rounded-lg flex items-center justify-center text-gray-400 bg-gray-50'>
							No image to preview
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function InfoItem({ label, value }: { label: string; value: string }) {
	return (
		<div className='mb-2'>
			<span className='font-medium text-gray-700'>{label}</span>
			<div className='text-gray-900 font-normal'>
				{value !== '' ? value : 'N/A'}
			</div>
		</div>
	)
}
