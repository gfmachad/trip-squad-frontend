import { Link2, Plus } from "lucide-react";
import { Button } from "./button/Button";
import { api } from "../lib/axios";
import { useEffect, useRef, useState } from "react";
import { CreateNewLinkModal } from "./modal/CreateNewLinkModal";
import { useParams } from "react-router-dom";

interface ILink {
	id: string;
	title: string;
	url: string;
}

export function ImportantLinks() {
	const modalRef = useRef<HTMLDivElement>(null);
	const { tripId } = useParams();
	const [links, setLinks] = useState<ILink[]>([]);
	const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

	const fetchLinks = () => {
		api
			.get(`trips/${tripId}/links`)
			.then((response) => setLinks(response.data.links));
	};

	useEffect(() => {
		fetchLinks();
	}, [tripId]);

	const handleOpenModal = () => {
		setIsCreateLinkModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsCreateLinkModalOpen(false);
	};

	return (
		<div className='space-y-6'>
			<h2 className='font-semibold text-xl'>Important Links</h2>
			<div className='space-y-5'>
				{links.map((link) => (
					<div
						key={link.id}
						className='flex items-center justify-between gap-4'
					>
						<div className='space-y-1.5'>
							<span className='block text-green-300 font-medium'>
								{link.title}
							</span>
							<a
								href={link.url}
								className='block text-green-500 text-sm truncate hover:text-green-200'
							>
								{link.url}
							</a>
						</div>
						<Link2 className='text-green-400 size-5 shrink-0' />
					</div>
				))}
			</div>
			<Button
				textButton='Create New Link'
				prefixIcon={<Plus className='size-5' />}
				size='full'
				variant='secondary'
				onClick={handleOpenModal}
			/>

			{isCreateLinkModalOpen && (
				<CreateNewLinkModal
					modalRef={modalRef}
					closeConfirmModal={handleCloseModal}
					fetchLinks={fetchLinks} // Pass the fetch function as a prop
				/>
			)}
		</div>
	);
}
