'use client'

import React, { useState } from 'react'
import {
	format,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	addMonths,
	subMonths,
	eachDayOfInterval,
	isToday
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date())

	const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
	const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

	const monthStart = startOfMonth(currentDate)
	const monthEnd = endOfMonth(monthStart)
	const weekStart = startOfWeek(monthStart)
	const weekEnd = endOfWeek(monthEnd)

	const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

	return (
		<div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
			{/* Header */}
			<div className="flex justify-between items-center mb-4">
				<button
					onClick={handlePrevMonth}
					className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
				>
					<ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
				</button>
				<h2 className="text-lg font-semibold text-gray-800 dark:text-white">
					{format(currentDate, 'MMMM yyyy')}
				</h2>
				<button
					onClick={handleNextMonth}
					className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
				>
					<ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
				</button>
			</div>

			{/* Days of the Week */}
			<div className="grid grid-cols-7 text-center font-medium text-gray-500 dark:text-gray-400 mb-2">
				{daysOfWeek.map(day => (
					<div key={day} className="py-2">
						{day}
					</div>
				))}
			</div>

			{/* Calendar Days */}
			<div className="grid grid-cols-7 gap-1">
				{days.map(day => {
					const isCurrentMonth =
						day.getMonth() === currentDate.getMonth()
					const isTodayDate = isToday(day)

					return (
						<div
							key={day.toString()}
							className={`p-2 flex items-center justify-center rounded-md transition-all
								${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400'}
								${isTodayDate ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
						>
							{format(day, 'd')}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Calendar
