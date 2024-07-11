import { Calendar, MapPin, PencilLine } from "lucide-react";
import { Button } from "./button/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { format } from "date-fns";

interface ITrip {
	id: string;
	destination: string;
	starts_at: string;
	ends_at: string;
	is_confirmed: boolean;
}

export function Navbar() {
	const { tripId } = useParams();
	const [trip, setTrip] = useState<ITrip | undefined>();

	useEffect(() => {
		api.get(`trips/${tripId}`).then((response) => setTrip(response.data.trip));
	}, [tripId]);
	const displayedDate =
		trip &&
		format(trip.starts_at, "LLL' 'd").concat(
			trip.starts_at !== trip.ends_at
				? " - " + format(trip.ends_at, "LLL' 'd")
				: " - " + format(trip.ends_at, "d")
		);

	return (
		<div className='px-4 h-16 rounded-xl bg-green-900 shadow-shape flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<MapPin className='size-5 text-green-400' />
				<span className='text-lg text-green-100'>{trip?.destination}</span>
			</div>

			<div className='flex items-center gap-5'>
				<div className='flex items-center gap-2'>
					<Calendar className='size-5 text-green-400' />
					<span className='text-lg text-green-100'>{displayedDate}</span>
				</div>

				<div className='w-px h-6 bg-green-800' />
				<Button
					variant='secondary'
					textButton='Change location/date'
					suffixIcon={<PencilLine className='size-5' />}
				/>
			</div>
		</div>
	);
}
