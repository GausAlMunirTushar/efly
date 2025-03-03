import React from 'react'

const Invoice = () => {
	return (
		<div className='max-w-4xl mx-auto p-8 bg-white shadow-md border rounded-lg'>
			{/* Header Section */}
			<div className='flex justify-between items-center mb-8'>
				<div>
					<h1 className='text-2xl font-bold text-primary-600'>
						Orbit Finance
					</h1>
					<p className='text-gray-600'>Orbit Apps</p>
					<p className='text-sm text-gray-500'>Munir Tushar</p>
					<p className='text-sm text-gray-500'>wiz@orbit.com</p>
					<p className='text-sm text-gray-500'>8029697597</p>
					<p className='text-sm text-gray-500'>myorbit.solutions</p>
					<p className='text-sm text-gray-500'>
						First Str, 28-32, Chicago, USA
					</p>
				</div>
				<div className='text-right'>
					<h2 className='text-xl font-semibold'>
						Accountant Invoice
					</h2>
					<p className='text-gray-600'>
						Invoice no: <span className='font-semibold'>001</span>
					</p>
					<p className='text-gray-600'>
						Invoice date:{' '}
						<span className='font-semibold'>Jul 13th, 2021</span>
					</p>
					<p className='text-gray-600'>
						Due:{' '}
						<span className='font-semibold'>Feb 13th, 2021</span>
					</p>
				</div>
			</div>

			{/* Bill To and Ship To Section */}
			<div className='grid grid-cols-2 gap-4 border-b pb-4 mb-4'>
				<div>
					<h3 className='font-semibold'>Bill to</h3>
					<p className='text-gray-500'>Orbit Finance</p>
					<p className='text-gray-500'>orbit@mail.com</p>
					<p className='text-gray-500'>8029697597</p>
					<p className='text-gray-500'>North Str, 32, Chicago, USA</p>
				</div>
				<div>
					<h3 className='font-semibold'>Ship to</h3>
					<p className='text-gray-500'>North Str, 32, Chicago, USA</p>
					<p className='text-gray-500'>Track #: RO8029697597</p>
				</div>
			</div>

			{/* Invoice Table */}
			<table className='w-full border-collapse border border-gray-200 text-left text-sm'>
				<thead>
					<tr className='bg-primary-600 text-white'>
						<th className='p-2 border'>DESCRIPTION</th>
						<th className='p-2 border'>RATE</th>
						<th className='p-2 border'>QTY</th>
						<th className='p-2 border'>TAX</th>
						<th className='p-2 border'>DISC</th>
						<th className='p-2 border'>AMOUNT</th>
					</tr>
				</thead>
				<tbody>
					<tr className='border'>
						<td className='p-2 border'>Prototype</td>
						<td className='p-2 border'>20,230,450.00</td>
						<td className='p-2 border'>2000</td>
						<td className='p-2 border'>20.50%</td>
						<td className='p-2 border'>20.50%</td>
						<td className='p-2 border'>20,230,450.00</td>
					</tr>
					<tr className='border'>
						<td className='p-2 border'>Design</td>
						<td className='p-2 border'>20,230,450.00</td>
						<td className='p-2 border'>2000</td>
						<td className='p-2 border'>20.50%</td>
						<td className='p-2 border'>20.50%</td>
						<td className='p-2 border'>20,230,450.00</td>
					</tr>
				</tbody>
			</table>

			{/* Payment & Summary Section */}
			<div className='grid grid-cols-2 gap-4 mt-6'>
				<div>
					<h3 className='font-semibold'>Payment Instruction</h3>
					<p className='text-gray-500'>
						Paypal: payment@myorbit.solutions
					</p>
					<p className='text-gray-500'>
						Make checks payable to: Munir Tushar
					</p>
					<p className='text-gray-500'>
						Bank Transfer ABA: 061120084
					</p>
				</div>
				<div className='text-right'>
					<p className='text-gray-500'>
						Subtotal:{' '}
						<span className='font-semibold'>USD 8000.00</span>
					</p>
					<p className='text-gray-500'>
						Discount (20%):{' '}
						<span className='font-semibold'>USD 0.00</span>
					</p>
					<p className='text-gray-500'>
						Shipping Cost:{' '}
						<span className='font-semibold'>USD 0.00</span>
					</p>
					<p className='text-gray-500'>
						Sales Tax:{' '}
						<span className='font-semibold'>USD 450.00</span>
					</p>
					<p className='text-lg font-semibold'>
						Total:{' '}
						<span className='text-primary-600'>USD 8,480.00</span>
					</p>
					<p className='text-gray-500'>
						Amount Paid:{' '}
						<span className='font-semibold'>USD 0.00</span>
					</p>
					<p className='text-lg font-bold text-primary-600'>
						Balance Due: USD 8,480.00
					</p>
				</div>
			</div>
		</div>
	)
}

export default Invoice
