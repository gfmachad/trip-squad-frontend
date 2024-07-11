import { FormEvent, useEffect, useRef, useState } from "react";
import { DestinationAndDate } from "./steps/DestinationAndDate";
import { InviteGuest } from "./steps/InviteGuest";
import { EmailModal } from "./modal/EmailModal";
import { ConfirmGuestModal } from "./modal/ConfirmGuestModal";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/axios";

export function Search() {
	const [isEmailInputOpen, setIsEmailInputOpen] = useState(false);
	const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
	const [isConfirmGuestModalOpen, setIsConfirmGuestModalOpen] = useState(false);
	const [emailsList, setEmailsList] = useState<string[]>([]);
	const [isTravelingAlone, setIsTravelingAlone] = useState(false);
	const [destination, setDestination] = useState("");
	const [eventStartEndDate, setEventStartEndDate] = useState<
		DateRange | undefined
	>();
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const modalRef = useRef<HTMLDivElement>(null);
	const modalRef2 = useRef<HTMLDivElement>(null);
	const [modalError, setModalError] = useState("");
	const navigate = useNavigate();

	function handleClickInput() {
		setIsEmailInputOpen(!isEmailInputOpen);
	}

	function handleClickButton() {
		if (!isTravelingAlone && emailsList.length === 0) {
			return;
		}

		setIsConfirmGuestModalOpen(!isConfirmGuestModalOpen);

		if (!isTravelingAlone && emailsList.length > 0) {
			setIsTravelingAlone(false);
		}
	}

	function handleClickEmailModal() {
		setIsEmailModalOpen(!isEmailModalOpen);
	}

	function handleCloseEmailModal() {
		setIsEmailModalOpen(false);
	}

	function handleCloseConfirmGuestModal() {
		setIsConfirmGuestModalOpen(false);
	}

	useEffect(() => {
		function handleEscKeyPress(event: KeyboardEvent) {
			if (event.key === "Escape" || event.keyCode === 27) {
				handleCloseEmailModal();
				handleCloseConfirmGuestModal();
			}
		}

		function handleClickOutsideModal(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				modalRef2.current &&
				!modalRef2.current.contains(event.target as Node)
			) {
				handleCloseEmailModal();
				handleCloseConfirmGuestModal();
			}
		}

		if (isEmailModalOpen || isConfirmGuestModalOpen) {
			document.body.style.overflow = "hidden";
			document.addEventListener("keydown", handleEscKeyPress);
			document.addEventListener("mousedown", handleClickOutsideModal);
		} else {
			document.body.style.overflow = "auto";
			document.removeEventListener("keydown", handleEscKeyPress);
			document.removeEventListener("mousedown", handleClickOutsideModal);
		}

		return () => {
			document.body.style.overflow = "auto";
			document.removeEventListener("keydown", handleEscKeyPress);
			document.removeEventListener("mousedown", handleClickOutsideModal);
		};
	}, [isEmailModalOpen, isConfirmGuestModalOpen]);

	async function confirmTrip(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!userName) {
			setModalError("Please enter your name.");
			return;
		}

		if (!userEmail) {
			setModalError("Please enter an email address.");
			return;
		}

		if (!destination) {
			setModalError("Please enter a destination.");
			return;
		}

		if (!eventStartEndDate?.from || !eventStartEndDate?.to) {
			setModalError("Please select start and end dates.");
			return;
		}

		if (emailsList.length === 0 && !isTravelingAlone) {
			setModalError("Please add at least one guest.");
			return;
		}

		setModalError("");

		handleCloseConfirmGuestModal();

		try {
			const response = await api.post("/trips", {
				destination,
				starts_at: eventStartEndDate?.from.toISOString(),
				ends_at: eventStartEndDate?.to.toISOString(),
				emails_to_invite: isTravelingAlone ? [userEmail] : emailsList,
				owner_name: userName,
				owner_email: userEmail,
			});

			const { tripId } = response.data;
			navigate(`/trips/${tripId}`);
		} catch (error) {
			setModalError("Error creating trip. Please try again later.");
		}
	}

	return (
		<>
			<div className='space-y-4 my-10'>
				<DestinationAndDate
					isEmailInputOpen={isEmailInputOpen}
					handleClickInput={handleClickInput}
					setDestination={setDestination}
					eventStartEndDate={eventStartEndDate}
					setEventStartEndDate={setEventStartEndDate}
				/>
				{isEmailInputOpen && (
					<InviteGuest
						isConfirmGuestModalOpen={isConfirmGuestModalOpen}
						isTravelingAlone={isTravelingAlone}
						emailsList={emailsList}
						handleClickEmailModal={handleClickEmailModal}
						handleClickButton={handleClickButton}
					/>
				)}
			</div>

			{isEmailModalOpen && (
				<EmailModal
					modalRef={modalRef}
					closeModal={handleCloseEmailModal}
					emailsList={emailsList}
					setEmailsList={setEmailsList}
					setUserEmail={setUserEmail}
					setIsTravelingAlone={setIsTravelingAlone}
					isTravelingAlone={isTravelingAlone}
					newGuestEmail={userEmail}
				/>
			)}
			{isConfirmGuestModalOpen && (
				<ConfirmGuestModal
					modalRef={modalRef2}
					closeConfirmModal={handleCloseConfirmGuestModal}
					emailsList={emailsList}
					setEmailsList={setEmailsList}
					userName={userName}
					setUserName={setUserName}
					userEmail={userEmail}
					setUserEmail={setUserEmail}
					addNewEmailToList={confirmTrip}
					error={modalError}
				/>
			)}
		</>
	);
}
