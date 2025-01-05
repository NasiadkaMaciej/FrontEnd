import { usePokemonContext } from "../context/PokemonContext";

const Navigation = () => {
	const { search, setSearch, type, setType, limit, setLimit, progress } = usePokemonContext();

	const handleSearchChange = (e) => setSearch(e.target.value);
	const handleTypeChange = (e) => setType(e.target.value);
	const handleLimitChange = (e) => setLimit(e.target.value);

	return (
		<header>
			<nav>
				<a href="/">Home</a>
				<a href="/pokemon">Pokédex</a>
				<a href="/favorites">Favorites</a>
			</nav>
			<div id="main">
				<h1>Pokédex</h1>
				<p>Loaded {progress} / 1302 Pokémon</p>
			</div>
			<div id="search">
				<input
					type="text"
					placeholder="Search Pokémon..."
					value={search}
					onChange={handleSearchChange}
				/>
				<select value={type} onChange={handleTypeChange}>
					<option value="">All Types</option>
					<option value="bug">Bug</option>
					<option value="dark">Dark</option>
					<option value="dragon">Dragon</option>
					<option value="electric">Electric</option>
					<option value="fairy">Fairy</option>
					<option value="fighting">Fighting</option>
					<option value="fire">Fire</option>
					<option value="flying">Flying</option>
					<option value="ghost">Ghost</option>
					<option value="grass">Grass</option>
					<option value="ground">Ground</option>
					<option value="ice">Ice</option>
					<option value="normal">Normal</option>
					<option value="poison">Poison</option>
					<option value="psychic">Psychic</option>
					<option value="rock">Rock</option>
					<option value="steel">Steel</option>
					<option value="stellar">Stellar</option>
					<option value="water">Water</option>
					<option value="unknown">Unknown</option>
				</select>
				<input
					type="number"
					min="1"
					max="100"
					value={limit}
					onChange={handleLimitChange}
				/>
			</div>
		</header>
	);
};

export default Navigation;
