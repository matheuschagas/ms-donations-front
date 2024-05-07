export const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return <div className="container mx-auto px-4 pt-10">{children}</div>;
};
