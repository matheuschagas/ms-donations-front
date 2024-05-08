export const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return <div className="flex w-full flex-col items-center">{children}</div>;
};
