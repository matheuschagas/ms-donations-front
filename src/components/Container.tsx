export const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return <div className="flex max-w-7xl flex-col items-center">{children}</div>;
};
