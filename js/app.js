const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const NUMBER_OF_POKEMONS = 1302;
const ITEMS_ON_LIST = 20;

const App = () => {
	const [pokemonList, setPokemonList] = React.useState([]);
	const [selectedPokemon, setSelectedPokemon] = React.useState(null);
	const [searchTerm, setSearchTerm] = React.useState('');
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		loadPokemons();
	}, []);

	const loadPokemons = async (offset = 0, limit = ITEMS_ON_LIST) => {
		if (offset >= NUMBER_OF_POKEMONS) return;

		try {
			const response = await fetch(`${API_BASE_URL}?offset=${offset}&limit=${limit}`);
			const data = await response.json();

			const batchDetails = await Promise.all(
				data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
			);

			setPokemonList((prevList) => [...prevList, ...batchDetails]);
			setProgress(Math.min(offset + limit, NUMBER_OF_POKEMONS));

			if (offset + limit < NUMBER_OF_POKEMONS)
				loadPokemons(offset + limit, limit);

		} catch (error) {
			console.error('Error fetching Pokémons:', error);
		}
	};

	const filteredPokemons = pokemonList.filter((pokemon) =>
		pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<header>
				<h1>Pokédex</h1>
				<p>
					Pokémons loaded: {progress} out of {NUMBER_OF_POKEMONS} ({((progress / NUMBER_OF_POKEMONS) * 100).toFixed(2)}%)
				</p>
				<input
					type="text"
					placeholder="Search Pokemon..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</header>
			<main>
				<section>
					<h2>Pokémon List</h2>
					<PokemonList pokemons={filteredPokemons.slice(0, 20)} onSelectPokemon={setSelectedPokemon} />
				</section>
				<section>
					<h2>Pokémon Details</h2>
					<PokemonDetails pokemon={selectedPokemon} />
				</section>
			</main>
		</>
	);
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
