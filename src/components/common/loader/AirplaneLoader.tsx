import React from 'react'
import './AirplaneLoader.css'

const AirplaneLoader: React.FC = () => {
	return (
		<div className='airplane-loader-container'>
			<div className='sky'>
				<div className='airplane'>✈️</div>
			</div>
		</div>
	)
}

export default AirplaneLoader
