import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "./button/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface IMember {
	id: string;
	name: string | null;
	email: string;
	is_confirmed: boolean;
}

export function Squad() {
	const { tripId } = useParams();
	const [squadMembers, setSquadMembers] = useState<IMember[]>([]);

	useEffect(() => {
		api
			.get(`trips/${tripId}/participants`)
			.then((response) => setSquadMembers(response.data.participants));
	}, [tripId]);

	return (
		<div className='space-y-6'>
			<h2 className='font-semibold text-xl'>Squad</h2>
			<div className='space-y-5'>
				{squadMembers.map((member, index) => (
					<div
						className='flex items-center justify-between gap-4'
						key={member.id}
					>
						<div className='space-y-1.5'>
							<span className='block text-green-300 font-medium'>
								{member.name ?? `Member ${index}`}
							</span>
							<span className='block text-green-500 text-xs truncate '>
								{member?.email}
							</span>
						</div>

						{member.is_confirmed ? (
							<CircleCheck className='text-green-400 size-5 shrink-0' />
						) : (
							<CircleDashed className='text-green-400 size-5 shrink-0' />
						)}
					</div>
				))}
			</div>
			{/* // Manage SQUAD */}
			<Button
				textButton='Manage Squad'
				size='full'
				variant='secondary'
				prefixIcon={<UserCog className='size-5' />}
			/>
		</div>
	);
}
