import { Details } from "../../components/Details";
import { Navbar } from "../../components/Navbar";

export function TripDetailsPage() {
	return (
		<div className='max-w-6xl w-full px-6 py-10 space-y-8 mx-auto'>
			<Navbar />
			<Details />
		</div>
	);
}
