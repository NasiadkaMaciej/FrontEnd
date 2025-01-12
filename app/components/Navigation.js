import { useState } from 'react';
import { usePokemonContext } from "../context/PokemonContext";

const Navigation = () => {
	const {
		search, setSearch, type, setType, limit, setLimit, progress, saveFilter, applyFilter, removeFilter, savedFilters, pokemonTypes
	} = usePokemonContext();

	const [isSavedFiltersOpen, setIsSavedFiltersOpen] = useState(false);

	const handleSearchChange = (e) => setSearch(e.target.value);
	const handleTypeChange = (e) => setType(e.target.value);
	const handleLimitChange = (e) => setLimit(e.target.value);

	const handleSaveFilter = () => saveFilter({ search, type, limit });
	const handleRemoveFilter = (filter) => removeFilter(filter);
	const handleApplyFilter = (filter) => applyFilter(filter);
	const toggleSavedFilters = () => setIsSavedFiltersOpen(!isSavedFiltersOpen);
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
					{pokemonTypes.map((type, index) => (
						<option key={index} value={type.toLowerCase() === "all types" ? "" : type.toLowerCase()}>
							{type}
						</option>
					))}
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
