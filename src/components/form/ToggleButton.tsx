'use client'

type ToggleButtonProps = {
	label: string
	isActive: boolean
	onClick: () => void
}

const ToggleButton = ({ label, isActive, onClick }: ToggleButtonProps) => (
	<button
		onClick={onClick}
		className={`px-4 py-2 text-sm rounded-md ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
	>
		{label}
	</button>
)

export default ToggleButton
