import { useState } from 'react';
import { usePokemonContext } from "../context/PokemonContext";

const Navigation = () => {
	const {
		search, setSearch, type, setType, limit, setLimit, progress, saveFilter, applyFilter, removeFilter, savedFilters
	} = usePokemonContext();

	const [isSavedFiltersOpen, setIsSavedFiltersOpen] = useState(false);

	const handleSearchChange = (e) => setSearch(e.target.value);
	const handleTypeChange = (e) => setType(e.target.value);
	const handleLimitChange = (e) => setLimit(e.target.value);

	const handleSaveFilter = () => saveFilter({ search, type, limit });
	const handleRemoveFilter = (filter) => removeFilter(filter);
	const handleApplyFilter = (filter) => applyFilter(filter);
	const toggleSavedFilters = () =>  setIsSavedFiltersOpen(!isSavedFiltersOpen);
	const closeSavedFilters = () => setIsSavedFiltersOpen(false);

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
				<button onClick={handleSaveFilter}>Save Filter</button>
			</div>
			<button onClick={toggleSavedFilters} className="toggle-filters-btn">
				Saved Filters
			</button>
			<div id="saved-filters" className={isSavedFiltersOpen ? 'open' : ''}>
				<button id="close-filters" className="closeBtn" onClick={closeSavedFilters}>
					&times;
				</button>
				<h2>Saved Filters</h2>
				<ul>
					{savedFilters.map((filter, index) => (
						<li key={index} className="saved-filter">
							<span>{`Search: ${filter.search}, Type: ${filter.type || 'All Types'}, Limit: ${filter.limit}`}</span>
							<button onClick={() => handleApplyFilter(filter)}>Apply</button>
							<button onClick={() => handleRemoveFilter(filter)}>Remove</button>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
};

export default Navigation;
