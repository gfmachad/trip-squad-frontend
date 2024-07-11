import { Calendar, Tag } from "lucide-react";
import { XButton } from "../button/XButton";
import { Button } from "../button/Button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface ICreateActivityModal {
	modalRef: React.RefObject<HTMLDivElement>;
	closeConfirmModal: () => void;
	fetchActivities: () => void; // Accept the fetch function as a prop
}

export function CreateActivityModal({
	modalRef,
	closeConfirmModal,
	fetchActivities, // Destructure the fetch function from props
}: ICreateActivityModal) {
	const { tripId } = useParams();

	async function createActivity(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const activityTitle = data.get("activity")?.toString();
		const activityDate = data.get("activityDate")?.toString();

		await api.post(`/trips/${tripId}/activities`, {
			title: activityTitle,
			occurs_at: activityDate,
		});

		closeConfirmModal();
		fetchActivities(); // Fetch the updated activities list
	}

	return (
		<div className='fixed inset-0 bg-black/60 flex items-center justify-center modalActivity'>
			<div
				ref={modalRef}
				className='w-[40rem] rounded-xl py-5 px-6 shadow-shape bg-green-900 space-y-5'
			>
				<div className='space-y-2'>
					<div className='space-y-2'>
						<div className='flex item-center justify-between'>
							<h2 className='text-white text-lg font-semibold'>
								Register Activity
							</h2>
							<XButton onClick={closeConfirmModal} />
						</div>
						<p className='text-sm text-start text-white'>
							All guests can view the activities.
						</p>
					</div>
					<form onSubmit={createActivity} className='space-y-3'>
						<div className='flex-1 flex items-center gap-2 h-14 px-4 bg-green-950 border border-green-800 rounded-lg'>
							<Tag className='size-5 text-green-400' />
							<input
								className='bg-transparent outline-none text-lg placeholder-green-400 flex-1'
								name='activity'
								placeholder='What is the activity?'
							/>
						</div>
						<div className='flex flex-center gap-2'>
							<div className='flex-1 flex items-center gap-2 h-14 px-4 bg-green-950 border border-green-800 rounded-lg'>
								<Calendar className='size-5 text-green-400' />
								<input
									className='bg-transparent outline-none text-lg text-green-400 flex-1'
									type='datetime-local'
									name='activityDate'
								/>
							</div>
						</div>
						<Button
							className='bg-cyan-700 text-white px-5 h-11 rounded-lg shadow-md font-medium flex items-center gap-2 hover:bg-cyan-600 w-full justify-center'
							textButton='Save Activity'
							size='full'
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
