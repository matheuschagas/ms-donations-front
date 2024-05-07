export const Header = () => {
	return (
		<header className="flex w-full items-center justify-between bg-gray-800 p-4 text-white">
			<h1 className="text-xl">Ajude o RS</h1>
			<nav>
				<ul className="flex gap-x-4">
					<li>
						<a href="#">Home</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};
