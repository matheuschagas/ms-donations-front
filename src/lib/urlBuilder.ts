interface urlBuilderProps {
	path: string;
	subdomain?: string;
}
export const urlBuilder = ({ path, subdomain }: urlBuilderProps) => {
	return `https://${subdomain ? subdomain + '.' : ''}${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/${path}`;
};
