/* eslint-disable no-mixed-spaces-and-tabs */
import { ArrowRight, Calendar, MapPin, PencilLine } from "lucide-react";
import { Button } from "../button/Button";
import { useRef, useState } from "react";
import { DatePickerModal } from "../modal/DatePickerModal";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface IDestinationAndDate {
	isEmailInputOpen: boolean;
	handleClickInput: () => void;
	setDestination: (destination: string) => void;
	eventStartEndDate: DateRange | undefined;
	setEventStartEndDate: (dates: DateRange | undefined) => void;
}

export function DestinationAndDate({
	isEmailInputOpen,
	handleClickInput,
	setDestination,
	eventStartEndDate,
	setEventStartEndDate,
}: IDestinationAndDate) {
	const modalRef = useRef<HTMLDivElement>(null);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	function handleOpenDatePicker() {
		setIsDatePickerOpen(!isDatePickerOpen);
	}

	function applyDates() {
		setIsDatePickerOpen(false);
	}

	const displayedDate =
		eventStartEndDate && eventStartEndDate.from && eventStartEndDate.to
			? format(eventStartEndDate.from, "LLL' 'd").concat(
					eventStartEndDate.from.getMonth() !== eventStartEndDate.to.getMonth()
						? " - " + format(eventStartEndDate.to, "LLL' 'd")
						: " - " + format(eventStartEndDate.to, "d")
			  )
			: null;

	return (
		<div className='bg-green-900 h-16 px-4 rounded-xl flex items-center shadow-shape gap-3'>
			<div className='flex items-center gap-2 flex-1'>
				<MapPin className='text-green-400 size-5' />
				<input
					className='bg-transparent outline-none text-lg placeholder-green-400 flex-1'
					disabled={isEmailInputOpen}
					type='text'
					placeholder='Where are you going?'
					onChange={(e) => setDestination(e.target.value)}
				/>
			</div>
			<button
				disabled={isEmailInputOpen}
				className='flex items-center gap-2 text-left'
				onClick={handleOpenDatePicker}
			>
				<Calendar className='text-green-400 size-5' />
				<span className='text-lg text-green-400 w-40'>
					{displayedDate || "When?"}
				</span>
			</button>
			{isDatePickerOpen && (
				<DatePickerModal
					closeModal={() => setIsDatePickerOpen(!isDatePickerOpen)}
					modalRef={modalRef}
					selected={eventStartEndDate}
					onSelect={setEventStartEndDate}
					applyDates={applyDates}
				/>
			)}
			<div className='w-px h-6 bg-green-800' />
			<Button
				variant='primary'
				onClick={handleClickInput}
				textButton={isEmailInputOpen ? "Change location/date" : "Continue "}
				suffixIcon={
					isEmailInputOpen ? (
						<PencilLine className='size-5' />
					) : (
						<ArrowRight className='size-5' />
					)
				}
			/>
		</div>
	);
}
