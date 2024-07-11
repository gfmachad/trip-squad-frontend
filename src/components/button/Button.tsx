/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const btnVariants = tv({
	base: "px-5 rounded-lg shadow-md font-medium flex items-center justify-center gap-2",

	variants: {
		variant: {
			primary: "bg-cyan-500 text-white hover:bg-cyan-600",
			secondary: "bg-cyan-700 text-white hover:bg-cyan-600",
			disabled: "bg-cyan-700 text-white hover:bg-cyan-600 cursor-not-allowed",
		},
		size: {
			default: "py-2",
			full: "w-full h-11",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
});

interface IButton
	extends ComponentProps<"button">,
		VariantProps<typeof btnVariants> {
	textButton?: any;
	prefixIcon?: any;
	suffixIcon?: any;
	extraClass?: any;
}

export function Button({
	variant,
	size,
	textButton,
	prefixIcon,
	suffixIcon,
	extraClass,
	...props
}: IButton) {
	return (
		<button
			{...props}
			className={`${btnVariants({ variant, size })} ${extraClass}`}
		>
			{prefixIcon} {textButton} {suffixIcon}
		</button>
	);
}
