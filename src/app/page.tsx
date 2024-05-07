import { Button } from '@/components/ui/button';

const Page = () => {
	return (
		<section className="flex h-screen w-full flex-col items-center gap-y-6">
			<Button size="lg">Quero ajudar</Button>
			<Button size="lg">Preciso de ajuda</Button>
		</section>
	);
};

export default Page;
