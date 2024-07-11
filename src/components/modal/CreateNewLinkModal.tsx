import { Link2, Text } from "lucide-react";
import { XButton } from "../button/XButton";
import { Button } from "../button/Button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface ICreateNewLinkModal {
	modalRef: React.RefObject<HTMLDivElement>;
	closeConfirmModal: () => void;
	fetchLinks: () => void; // Accept the fetch function as a prop
}

export function CreateNewLinkModal({
	modalRef,
	closeConfirmModal,
	fetchLinks, // Destructure the fetch function from props
}: ICreateNewLinkModal) {
	const { tripId } = useParams();

	const createLink = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const title = data.get("title")?.toString();
		const url = data.get("url")?.toString();

		await api.post(`/trips/${tripId}/links`, {
			title,
			url,
		});

		closeConfirmModal();
		fetchLinks(); // Fetch the updated links list
	};

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
								Create New Link
							</h2>
							<XButton onClick={closeConfirmModal} />
						</div>
						<p className='text-sm text-start text-white'>
							All guests can view the links.
						</p>
					</div>
					<form onSubmit={createLink} className='space-y-3'>
						<div className='flex-1 flex items-center gap-2 h-14 px-4 bg-green-950 border border-green-800 rounded-lg'>
							<Text className='size-5 text-green-400' />
							<input
								className='bg-transparent outline-none text-lg placeholder-green-400 flex-1'
								name='title'
								placeholder='Link Name'
							/>
						</div>
						<div className='flex flex-center gap-2'>
							<div className='flex-1 flex items-center gap-2 h-14 px-4 bg-green-950 border border-green-800 rounded-lg'>
								<Link2 className='size-5 text-green-400' />
								<input
									className='bg-transparent outline-none text-lg placeholder-green-400 flex-1'
									name='url'
									placeholder='URL'
								/>
							</div>
						</div>
						<Button
							className='bg-cyan-700 text-white px-5 h-11 rounded-lg shadow-md font-medium flex items-center gap-2 hover:bg-cyan-600 w-full justify-center'
							textButton='Save Link'
							size='full'
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
