import { airlines } from '@/data/airlines'
import MostPopularAirlines from './MostPopularAirlines'
const Airlines = () => {
	return (
		<section>
			<MostPopularAirlines airlines={airlines} />
		</section>
	)
}

export default Airlines
