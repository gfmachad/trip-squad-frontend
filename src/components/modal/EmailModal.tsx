import { Plus, AlertCircle, AtSign, Crown } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../button/Button";
import { XButton } from "../button/XButton";

interface IEmailModal {
	modalRef: React.RefObject<HTMLDivElement>;
	closeModal: () => void;
	emailsList: string[];
	setEmailsList: React.Dispatch<React.SetStateAction<string[]>>;
	setUserEmail: React.Dispatch<React.SetStateAction<string>>;
	setIsTravelingAlone: React.Dispatch<React.SetStateAction<boolean>>;
	isTravelingAlone: boolean;
	newGuestEmail?: string;
}

export function EmailModal({
	modalRef,
	closeModal,
	emailsList,
	setEmailsList,
	newGuestEmail,
	setIsTravelingAlone,
	isTravelingAlone,
}: IEmailModal) {
	const [error, setError] = useState("");

	function addNewEmailToList(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const getNewData = new FormData(e.currentTarget);
		const newEmail = getNewData.get("email")?.toString();

		if (!newEmail) {
			setError("Please enter an email address.");
			return;
		}

		if (emailsList.includes(newEmail)) {
			setError("Email address already added.");
			return;
		}

		if (isTravelingAlone && emailsList.length > 0) {
			setError("You can only add one email when traveling alone.");
			return;
		}

		setEmailsList([...emailsList, newEmail]);
		setError("");
		e.currentTarget.reset();
	}

	function removeEmailFromList(emailToRemove: string) {
		const newEmailsList = emailsList.filter((email) => email !== emailToRemove);
		setEmailsList(newEmailsList);

		if (emailToRemove === newGuestEmail) {
			setIsTravelingAlone(false);
		}
	}

	function handleCheckboxChange() {
		console.log("Checkbox clicked!");
		setIsTravelingAlone(!isTravelingAlone);
	}

	return (
		<div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
			<div
				ref={modalRef}
				className='w-[40rem] rounded-xl py-5 px-6 shadow-shape bg-green-900 space-y-5'
			>
				<div className='space-y-2'>
					<div className='flex item-center justify-between'>
						<h2 className='text-white text-lg font-semibold'>Select Guests</h2>
						<XButton onClick={closeModal} />
					</div>
					<p className='text-sm text-start'>
						Guests will receive emails to confirm their participation in the
						trip.
					</p>
				</div>

				<div className='flex flex-wrap gap-2'>
					{emailsList.map((email) => (
						<div
							className='py-1.5 px-2.5 rounded-md bg-green-800 flex items-center gap-2'
							key={email}
						>
							<span className='text-green-300'>{email}</span>
							{email === newGuestEmail && (
								<Crown className='size-5 text-yellow-400' />
							)}
							<XButton onClick={() => removeEmailFromList(email)} />
						</div>
					))}
				</div>

				<div className='w-full h-px bg-green-800' />
				<div className='flex items-center gap-2 mt-3'>
					<input
						type='checkbox'
						checked={isTravelingAlone}
						onChange={handleCheckboxChange}
						className='text-green-800 size-5'
					/>
					<div className='flex flex-col'>
						<span className='text-green-400'>Traveling alone</span>
					</div>
				</div>
				{isTravelingAlone && (
					<span className='text-green-200 text-xs'>
						If traveling alone, just click Continue.
					</span>
				)}
				<div className='w-full h-px bg-green-800' />

				<form
					onSubmit={addNewEmailToList}
					className='flex items-center gap-2 p-2.5 bg-green-950 border border-green-800 rounded-lg'
				>
					<div className='flex items-center flex-1 px-2 gap-2'>
						<AtSign className='size-5 text-green-400' />
						<input
							className='bg-transparent outline-none text-lg placeholder-green-400 flex-1'
							type='email'
							name='email'
							placeholder="Enter the guest's email"
						/>
					</div>
					<div className='px-2 gap-2'>
						<Button
							variant={isTravelingAlone ? "disabled" : "primary"}
							type='submit'
							textButton='Invite'
							disabled={isTravelingAlone}
							suffixIcon={<Plus className='size-5' />}
						/>
					</div>
				</form>

				<div className='px-2 gap-2 '>
					<Button
						variant='primary'
						textButton='Continue'
						size='full'
						onClick={closeModal}
					/>
				</div>
				{error && (
					<p className='text-red-500 text-sm flex items-center gap-1'>
						<AlertCircle className='size-4 text-red-500' />
						{error}
					</p>
				)}
			</div>
		</div>
	);
}
