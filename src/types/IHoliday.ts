interface LocationPopulated {
	_id: string
	name: string
}
export interface IHoliday {
	id: string
	title: string
	price: number
	location: string | LocationPopulated
	imageUrl: string
	nightsInfo: string
	description?: string
	tags: string[]
}
