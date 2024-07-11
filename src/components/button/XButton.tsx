import { X } from "lucide-react";
interface IXButton {
	onClick?: () => void;
}
export function XButton({ onClick }: IXButton) {
	return (
		<button
			onClick={onClick}
			type='button'
			className='text-green-400 hover:text-green-300'
		>
			<X className='size-5' />
		</button>
	);
}
