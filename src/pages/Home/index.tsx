import { Footer } from "../../components/Footer";
import { Search } from "../../components/Search";

export function HomePage() {
	return (
		<div className='h-screen flex items-center justify-center bg-bgGrid bg-no-repeat bg-center'>
			<div className='max-w-3xl w-full px-6 text-center'>
				<div className='flex flex-col items-center gap-3'>
					<img src='./../../../logo_text1.png' width={150} alt='Trip Squad' />
					<p className='text-green-300 text-lg'>
						Invite your friends and plan your next trip!
					</p>
				</div>
				<Search />
				<Footer />
			</div>
		</div>
	);
}
