import { CircleCheck, Plus } from "lucide-react";
import { Button } from "./button/Button";
import { useEffect, useRef, useState } from "react";
import { CreateActivityModal } from "./modal/CreateActivityModal";
import { useParams } from "react-router-dom";
import { api } from "../lib/axios";
import { format } from "date-fns";
import { enUS } from "date-fns/locale/en-US";

interface IDetails {
	date: string;
	activities: {
		id: string;
		title: string;
		occurs_at: string;
	}[];
}

export function Activities() {
	const modalRef = useRef<HTMLDivElement>(null);
	const { tripId } = useParams();
	const [activities, setActivities] = useState<IDetails[]>([]);
	const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
		useState(false);

	const fetchActivities = () => {
		api
			.get(`trips/${tripId}/activities`)
			.then((response) => setActivities(response.data.activities));
	};

	useEffect(() => {
		fetchActivities();
	}, [tripId]);

	function handleOpenModal() {
		setIsCreateActivityModalOpen(!isCreateActivityModalOpen);
	}

	function handleCloseModal() {
		setIsCreateActivityModalOpen(false);
	}

	return (
		<div className='flex-1 space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-3xl font-semibold'>Atividades</h2>
				<Button
					textButton='Create Activity'
					suffixIcon={<Plus className='size-5' />}
					variant='primary'
					onClick={handleOpenModal}
				/>
			</div>
			<div className='space-y-8'>
				{activities.map((category) => {
					return (
						<div key={category.date} className='space-y-2.5'>
							<div className='flex gap-2 items-baseline'>
								<h2 className='text-xl font-semibold text-green-300'>
									Day {format(new Date(category.date), "d")}
								</h2>
								<h2 className='text-xs text-green-500'>
									{format(new Date(category.date), "EEEE", { locale: enUS })}
								</h2>
							</div>
							{category.activities.length > 0 ? (
								<div>
									{category.activities.map((activity) => {
										return (
											<div
												key={activity.id}
												className='bg-green-950 rounded-xl shadow-shape px-4 py-2.5 flex items-center gap-3'
											>
												<CircleCheck className='size-5 text-green-300' />
												<span className='text-green-300 '>
													{activity.title}
												</span>
												<span className='text-green-500 text-sm ml-auto'>
													{format(new Date(activity.occurs_at), "h:mm a")}
												</span>
											</div>
										);
									})}
								</div>
							) : (
								<p className='text-green-500 text-sm'>
									No activities registered on this date.
								</p>
							)}
						</div>
					);
				})}
			</div>
			{isCreateActivityModalOpen && (
				<CreateActivityModal
					modalRef={modalRef}
					closeConfirmModal={handleCloseModal}
					fetchActivities={fetchActivities}
				/>
			)}
		</div>
	);
}
