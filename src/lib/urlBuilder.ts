interface urlBuilderProps {
	path: string;
}
export const urlBuilder = ({ path }: urlBuilderProps) => {
	return `${process.env.API_URL}/${process.env.API_VERSION}/${path}`;
};
