import MostPopularAirlines from '@/components/pages/front-pages/flight/MostPopularAirlines'
import FlightSearch from '@/components/pages/home/FlightSearch'
import { airlines } from '@/data/airlines'

const FlightPage = () => {
	return (
		<section>
			<FlightSearch />
			<MostPopularAirlines airlines={airlines} />
		</section>
	)
}

export default FlightPage
