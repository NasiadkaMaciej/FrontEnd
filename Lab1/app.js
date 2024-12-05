const pokemonHTMLList = document.getElementById('list');
const pokemonList = [];
const searchInput = document.getElementById('search');

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const NUMBER_OF_POKEMONS = 1302;
let isFetching = false;
let isSearching = false;

async function loadPokemons(offset = 0, limit = 20) {
	if (isFetching || offset >= NUMBER_OF_POKEMONS) return
	isFetching = true;

	// Fetching pokemons part by part to make website usable as soon as posible
	try {
		const response = await fetch(`${API_BASE_URL}?offset=${offset}&limit=${limit}`);
		const data = await response.json();

		const batchDetails = await Promise.all(
			data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
		);

		pokemonList.push(...batchDetails);
		if (!isSearching)
			listPokemons(batchDetails);
	} catch (error) {
		console.error('Error fetching Pokémon data:', error);
	} finally {
		isFetching = false;
		updateProgress(Math.min(offset + limit, NUMBER_OF_POKEMONS));
		// Continue fetching the rest of the pokemons in the background
		if (offset + limit < NUMBER_OF_POKEMONS)
	   		loadPokemons(offset + limit, limit);
	}
}

function updateProgress(number) {
	const progress = document.getElementById('progress')
	const percentage = (number / NUMBER_OF_POKEMONS*100).toFixed(2);
	progress.innerHTML = `${number} out of ${NUMBER_OF_POKEMONS} (${percentage}%)`
}

// Displaying the details of the selected pokemon
function displayPokemonDetails(pokemon) {
	const detailsDiv = document.getElementById('details');
	detailsDiv.innerHTML = `
		<h2>${pokemon.name}</h2>
		<img src="${pokemon.sprites.other.showdown.front_default}" alt="${pokemon.name}" style="width:100px;height:100px;">
		<p>Height: ${pokemon.height}</p>
		<p>Weight: ${pokemon.weight}</p>
		<p>Type: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
	`;
}

// Listing pokemons from given list, all pokemons or filtered pokemons
function listPokemons(pokemons) {
	pokemonHTMLList.innerHTML = ''; // Clear the existing list before populating
	pokemons.forEach(pokemon => {
		const listItem = document.createElement('li');
		const img = document.createElement('img');
		img.src = pokemon.sprites.other.showdown.front_default || '';
		img.alt = pokemon.name;
		listItem.appendChild(img);
		listItem.appendChild(document.createTextNode(pokemon.name));
		listItem.onclick = () => displayPokemonDetails(pokemon);
		if (pokemonHTMLList.childElementCount < 20)
			pokemonHTMLList.appendChild(listItem);
	});
}

searchInput.oninput = () => {
	const searchTerm = searchInput.value.toLowerCase();
	isSearching = searchTerm.length > 0;
	const filteredPokemons = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));

	pokemonHTMLList.innerHTML = '';
	listPokemons(filteredPokemons.slice(0, 20));
};

// Initial Load
loadPokemons();