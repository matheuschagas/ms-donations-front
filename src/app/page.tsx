import { Button } from '@/components/ui/button';

const Page = () => {
	const handleGetHelp = () => {};
	const handleHelp = () => {};
	return (
		<section className="flex h-screen w-full flex-col items-center gap-y-6">
			<Button onClick={handleHelp} size="lg">
				Quero ajudar
			</Button>
			<Button onClick={handleGetHelp} size="lg">
				Preciso de ajuda
			</Button>
		</section>
	);
};

export default Page;
