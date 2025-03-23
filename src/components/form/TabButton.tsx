'use client'

type TabButtonProps = { label: string; isActive: boolean }

const TabButton = ({ label, isActive }: TabButtonProps) => (
	<button
		className={`text-sm font-medium pb-2 border-b-2 ${isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'}`}
	>
		{label}
	</button>
)

export default TabButton
