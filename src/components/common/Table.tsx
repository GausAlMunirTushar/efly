'use client'
import React, { useState, useMemo } from 'react'
import {
	ChevronUp,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ArrowRight,
	ArrowLeft
} from 'lucide-react'

interface TableProps {
	columns: any[]
	data: any[]
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
	const [sortConfig, setSortConfig] = useState<{
		key: string
		direction: 'ascending' | 'descending' | null
	}>({
		key: '',
		direction: null
	})

	const [currentPage, setCurrentPage] = useState(0)
	const [pageSize, setPageSize] = useState(10)
	const [filterText, setFilterText] = useState('')

	const sortedData = useMemo(() => {
		if (sortConfig.key) {
			return [...data].sort((a, b) => {
				const aValue = a[sortConfig.key]
				const bValue = b[sortConfig.key]
				if (aValue < bValue)
					return sortConfig.direction === 'ascending' ? -1 : 1
				if (aValue > bValue)
					return sortConfig.direction === 'ascending' ? 1 : -1
				return 0
			})
		}
		return data
	}, [data, sortConfig])

	const filteredData = useMemo(() => {
		return sortedData.filter(row =>
			columns.some(column =>
				row[column.accessor]
					?.toString()
					.toLowerCase()
					.includes(filterText.toLowerCase())
			)
		)
	}, [sortedData, filterText, columns])

	const startIndex = currentPage * pageSize
	const paginatedData = filteredData.slice(startIndex, startIndex + pageSize)
	const pageCount = Math.ceil(filteredData.length / pageSize)

	const handleSort = (key: string) => {
		const direction =
			sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
		setSortConfig({ key, direction })
	}

	const handlePageChange = (newPage: number) => setCurrentPage(newPage)
	const handlePageSizeChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setPageSize(Number(event.target.value))
		setCurrentPage(0)
	}

	const handleClearFilter = () => {
		setFilterText('')
	}

	return (
		<div className='overflow-x-auto  dark:bg-bg_dark  rounded-lg'>
			{/* Search Filter */}
			<div className='mb-4 flex items-center justify-between'>
				<input
					type='text'
					value={filterText}
					onChange={e => setFilterText(e.target.value)}
					placeholder='Search...'
					className='px-4 py-1 border-2 border-primary-500 dark:border-none dark:fucos:none focus:outline-none focus:border-primary-500 rounded-md w-full max-w-60 bg-bg_light dark:bg-body_dark text-gray-900 dark:text-white'
				/>
				{filterText && (
					<button
						onClick={handleClearFilter}
						className='ml-2 text-primary-500 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-400'
					>
						Clear
					</button>
				)}
			</div>

			<table className='min-w-full table-auto bg-bg_light dark:bg-body_dark text-gray-900 dark:text-white '>
				<thead className='bg-gray-200 dark:bg-bg_secondary'>
					<tr>
						{columns.map(column => (
							<th
								key={column.accessor}
								onClick={() => handleSort(column.accessor)}
								className='px-4 py-2 text-left cursor-pointer font-semibold text-gray-600 dark:text-gray-300'
							>
								{column.Header}
								{sortConfig.key === column.accessor &&
									(sortConfig.direction === 'ascending' ? (
										<ChevronUp className='inline ml-1' />
									) : (
										<ChevronDown className='inline ml-1' />
									))}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((row, rowIndex) => (
						<tr
							key={rowIndex}
							className='border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-bg_dark transition-colors duration-300'
						>
							{columns.map(column => (
								<td
									key={column.accessor}
									className='px-4 py-2 text-sm text-gray-800 dark:text-gray-300'
								>
									{row[column.accessor]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			<div className='flex items-center justify-end gap-10 py-4'>
				<div className='flex items-center space-x-2'>
					<span className='text-sm text-gray-900 dark:text-gray-300'>
						Page {currentPage + 1} of {pageCount}
					</span>
					<select
						value={pageSize}
						onChange={handlePageSizeChange}
						className='px-2 py-1 text-sm border rounded-md bg-bg_light dark:bg-bg_dark text-gray-900 dark:text-white'
					>
						{[10, 20, 30, 40].map(size => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
				</div>
				<div className='flex items-center space-x-2'>
					<button
						onClick={() => handlePageChange(0)}
						disabled={currentPage === 0}
						className='px-3 py-2 bg-gray-200 dark:bg-bg_secondary rounded-md cursor-pointer'
					>
						<ArrowLeft className='w-4 h-4 text-primary dark:text-white' />
					</button>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 0}
						className='px-3 py-2 bg-gray-200 dark:bg-bg_secondary rounded-md cursor-pointer'
					>
						<ChevronLeft className='w-4 h-4 text-primary dark:text-white' />
					</button>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === pageCount - 1}
						className='px-3 py-2 bg-gray-200 dark:bg-bg_secondary rounded-md cursor-pointer'
					>
						<ChevronRight className='w-4 h-4 text-primary dark:text-white' />
					</button>
					<button
						onClick={() => handlePageChange(pageCount - 1)}
						disabled={currentPage === pageCount - 1}
						className='px-3 py-2 bg-gray-200 dark:bg-bg_secondary rounded-md cursor-pointer'
					>
						<ArrowRight className='w-4 h-4 text-primary dark:text-white' />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Table
