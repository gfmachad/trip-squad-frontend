import { DateRange, DayPicker } from "react-day-picker";
import { XButton } from "../button/XButton";
import { Button } from "../button/Button"; // Importe o botão aqui
import "react-day-picker/dist/style.css";

interface IDatePickerModal {
	modalRef: React.RefObject<HTMLDivElement>;
	closeModal: () => void;
	selected: DateRange | undefined;
	onSelect: (dates: DateRange | undefined) => void;
	applyDates: () => void;
}

export function DatePickerModal({
	modalRef,
	closeModal,
	selected,
	onSelect,
	applyDates,
}: IDatePickerModal) {
	return (
		<div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
			<div
				ref={modalRef}
				className='rounded-xl py-5 px-6 shadow-shape bg-green-900 space-y-5'
			>
				<div className='space-y-2'>
					<div className='flex item-center justify-between'>
						<h2 className='text-white text-lg font-semibold'>Select Date</h2>
						<XButton onClick={closeModal} />
					</div>
				</div>
				<DayPicker mode='range' selected={selected} onSelect={onSelect} />
				<Button
					variant='primary'
					size='full'
					onClick={applyDates}
					textButton='Confirm'
				/>
			</div>
		</div>
	);
}
