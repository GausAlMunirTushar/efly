'use client'

import { useState } from 'react'
import { CreditCard, DollarSign, TrendingUp } from 'lucide-react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer
} from 'recharts'
import Title from '@/components/common/Title'

const transactionData = [
	{ id: 1, title: 'Salary', amount: 3000, type: 'income', date: 'Feb 1' },
	{ id: 2, title: 'Groceries', amount: -120, type: 'expense', date: 'Feb 3' },
	{ id: 3, title: 'Freelance', amount: 800, type: 'income', date: 'Feb 7' },
	{
		id: 4,
		title: 'Internet Bill',
		amount: -60,
		type: 'expense',
		date: 'Feb 10'
	}
]

const financeChartData = [
	{ name: 'Jan', balance: 1200 },
	{ name: 'Feb', balance: 1800 },
	{ name: 'Mar', balance: 2500 },
	{ name: 'Apr', balance: 3200 },
	{ name: 'May', balance: 4000 }
]

const FinanceDashboard = () => {
	const [balance] = useState(5000)
	const income = transactionData
		.filter(t => t.type === 'income')
		.reduce((acc, t) => acc + t.amount, 0)
	const expenses = transactionData
		.filter(t => t.type === 'expense')
		.reduce((acc, t) => acc + Math.abs(t.amount), 0)

	return (
		<div className=' py-2 '>
			<Title>Finance Dashboard</Title>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
				{/* Account Balance */}
				<div className='bg-white box-shadow dark:bg-bg_dark p-6 rounded-lg shadow-md flex items-center gap-4'>
					<DollarSign className='text-green-500 w-10 h-10' />
					<div>
						<p className='text-gray-500 dark:text-gray-400'>
							Account Balance
						</p>
						<h3 className='text-2xl font-semibold text-gray-800 dark:text-white'>
							${balance.toLocaleString()}
						</h3>
					</div>
				</div>

				{/* Income */}
				<div className='bg-white box-shadow dark:bg-bg_dark p-6 rounded-lg shadow-md flex items-center gap-4'>
					<TrendingUp className='text-primary-500 w-10 h-10' />
					<div>
						<p className='text-gray-500 dark:text-gray-400'>
							Total Income
						</p>
						<h3 className='text-2xl font-semibold text-gray-800 dark:text-white'>
							${income.toLocaleString()}
						</h3>
					</div>
				</div>

				{/* Expenses */}
				<div className='bg-white box-shadow dark:bg-bg_dark p-6 rounded-lg shadow-md flex items-center gap-4'>
					<CreditCard className='text-red-500 w-10 h-10' />
					<div>
						<p className='text-gray-500 dark:text-gray-400'>
							Total Expenses
						</p>
						<h3 className='text-2xl font-semibold text-gray-800 dark:text-white'>
							-${expenses.toLocaleString()}
						</h3>
					</div>
				</div>
			</div>

			{/* Financial Graph */}
			<div className='bg-white box-shadow dark:bg-bg_dark mt-6 p-6 rounded-lg shadow-md'>
				<h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>
					Financial Growth
				</h3>
				<ResponsiveContainer width='100%' height={300}>
					<LineChart data={financeChartData}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Line
							type='monotone'
							dataKey='balance'
							stroke='#4F46E5'
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			{/* Recent Transactions */}
			<div className='bg-white box-shadow dark:bg-bg_dark mt-6 p-6 rounded-lg shadow-md'>
				<h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>
					Recent Transactions
				</h3>
				<ul className='space-y-4'>
					{transactionData.map(transaction => (
						<li
							key={transaction.id}
							className='flex justify-between items-center border-b pb-2 last:border-none dark:text-white'
						>
							<div>
								<p className='font-medium'>
									{transaction.title}
								</p>
								<p className='text-sm text-gray-500'>
									{transaction.date}
								</p>
							</div>
							<span
								className={`font-semibold ${
									transaction.type === 'income'
										? 'text-green-500'
										: 'text-red-500'
								}`}
							>
								{transaction.type === 'income' ? '+' : '-'}$
								{Math.abs(transaction.amount)}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default FinanceDashboard
