/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { AlertCircle, User, Mail, Crown } from "lucide-react";
import { XButton } from "../button/XButton";
import { Button } from "../button/Button";
import { FormEvent } from "react";

interface IConfirmGuestModal {
	modalRef: React.RefObject<HTMLDivElement>;
	closeConfirmModal: () => void;
	addNewEmailToList: (e: FormEvent<HTMLFormElement>) => void;
	emailsList: string[];
	setEmailsList: React.Dispatch<React.SetStateAction<string[]>>;
	userName: string;
	userEmail: string;
	setUserName: (name: string) => void;
	setUserEmail: (email: string) => void;
	error: any;
}

export function ConfirmGuestModal({
	modalRef,
	closeConfirmModal,
	addNewEmailToList,
	emailsList,
	setEmailsList,
	userName,
	setUserName,
	userEmail,
	setUserEmail,
	error,
}: IConfirmGuestModal) {
	function renderEmailList() {
		return (
			<div className='flex flex-wrap gap-2'>
				{emailsList.map((email, index) => (
					<div
						className='py-1.5 px-2.5 rounded-md bg-green-800 flex items-center gap-2'
						key={index}
					>
						<span className='text-green-300'>{email}</span>
						{email === userEmail && (
							<Crown className='size-5 text-yellow-400' />
						)}
						<XButton onClick={() => removeEmailFromList(email)} />
					</div>
				))}
			</div>
		);
	}

	function removeEmailFromList(emailToRemove: string) {
		const newEmailsList = emailsList.filter((email) => email !== emailToRemove);
		setEmailsList(newEmailsList);
	}

	return (
		<div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
			<div
				ref={modalRef}
				className='w-[40rem] rounded-xl py-5 px-6 shadow-shape bg-green-900 space-y-5'
			>
				<div className='space-y-2'>
					<div className='flex item-center justify-between'>
						<h2 className='text-white text-lg font-semibold'>
							Confirm trip creation
						</h2>
						<XButton onClick={closeConfirmModal} />
					</div>
					<p className='text-sm text-start text-white'>
						To complete the creation of the trip to{" "}
						<span className='font-semibold text-green-400'>
							Florianópolis, Brazil
						</span>{" "}
						for the dates{" "}
						<span className='font-semibold text-green-400'>
							August 16 to 27, 2024{" "}
						</span>
						, please fill in your details below:
					</p>
				</div>

				<form onSubmit={addNewEmailToList} className='space-y-3'>
					<div className='flex-1 flex items-center gap-2 h-14 px-4 bg-green-950 border border-green-800 rounded-lg'>
						<User className='size-5 text-green-400' />
						<input
							className='bg-transparent outline-none text-lg placeholder-green-400 flex-1'
							type='text'
							name='userName'
							placeholder='Your name'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
					<div className='flex-1 flex items-center gap-2 h-14 px-4 bg-green-950 border border-green-800 rounded-lg'>
						<Mail className='size-5 text-green-400' />
						<input
							className='bg-transparent outline-none text-lg placeholder-green-400 flex-1'
							type='email'
							name='userEmail'
							placeholder='Your personal email'
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
						/>
					</div>
					<Button
						className='w-full justify-center'
						textButton='Confirm trip!'
						size='full'
					/>
					<p className='text-xs text-white'>
						This email will also be added to the guest list.
					</p>
				</form>

				{renderEmailList()}

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
