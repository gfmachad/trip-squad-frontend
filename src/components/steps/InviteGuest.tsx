import { ArrowRight, Ban, UserPlus2 } from "lucide-react";
import { Button } from "../button/Button";

interface IInviteGuest {
	isConfirmGuestModalOpen: boolean;
	isTravelingAlone: boolean;
	emailsList: string[];
	handleClickEmailModal: () => void;
	handleClickButton: () => void;
}

export function InviteGuest({
	isConfirmGuestModalOpen,
	isTravelingAlone,
	emailsList,
	handleClickEmailModal,
	handleClickButton,
}: IInviteGuest) {
	const emailCountText =
		emailsList.length === 1 ? "1 person" : `${emailsList.length} people`;

	return (
		<div className='bg-green-900 h-16 px-4 rounded-xl flex items-center shadow-shape gap-3'>
			<button
				onClick={handleClickEmailModal}
				type='button'
				className='flex items-center gap-2 text-lg flex-1 text-green-400 outline-none'
			>
				<UserPlus2 className='text-green-400 size-5' />
				{emailsList.length === 0
					? "Who will be on the trip?"
					: `${emailCountText} will be on the trip`}
			</button>

			<div className='w-px h-6 bg-green-800' />

			<Button
				variant={
					isConfirmGuestModalOpen ||
					(!isTravelingAlone && emailsList.length === 0)
						? "disabled"
						: "primary"
				}
				onClick={handleClickButton}
				disabled={!isTravelingAlone && emailsList.length === 0}
				textButton={`${
					!isTravelingAlone && emailsList.length === 0
						? "Invite to confirm"
						: "Confirm trip"
				}`}
				suffixIcon={
					!isTravelingAlone && emailsList.length === 0 ? (
						<Ban className='size-5' />
					) : (
						<ArrowRight className='size-5' />
					)
				}
			/>
		</div>
	);
}
