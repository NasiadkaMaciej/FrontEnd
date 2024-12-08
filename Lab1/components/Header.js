const Header = ({ progress, total, searchTerm, setSearchTerm }) => {
	return (
		<header>
			<h1>Pokédex</h1>
			<p>
				Loaded {progress} / {total} Pokémon
			</p>
			<input
				type="text"
				placeholder="Search Pokémon..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</header>
	);
};
