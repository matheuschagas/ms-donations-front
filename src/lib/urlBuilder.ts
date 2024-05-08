interface urlBuilderProps {
	path: string;
}
export const urlBuilder = ({ path }: urlBuilderProps) => {
	return `http://${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/${path}`;
};
