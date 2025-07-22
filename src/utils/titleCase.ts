const titleCase = (text: string) =>
	text
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ')

export default titleCase
