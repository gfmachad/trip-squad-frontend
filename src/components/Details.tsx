import { Activities } from "./Activities";
import { ImportantLinks } from "./ImportantLinks";
import { Squad } from "./Squad";

export function Details() {
	return (
		<main className='flex gap-16 px-4'>
			<Activities />
			<div className='w-80 space-y-6'>
				<ImportantLinks />
				<div className='w-full h-px bg-green-800' />
				<Squad />
			</div>
		</main>
	);
}
