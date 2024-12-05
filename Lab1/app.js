const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const NUMBER_OF_POKEMONS = 1302;
const ITEMS_ON_LIST = 20

const pokemonList = [];
let isFetching = false;
let isSearching = false;

const pokemonHTMLList = document.getElementById('list');
const searchInput = document.getElementById('search');
const detailsDiv = document.getElementById('details');
const progress = document.getElementById('progress')

async function loadPokemons(offset = 0, limit = ITEMS_ON_LIST) {
	if (isFetching || offset >= NUMBER_OF_POKEMONS) return
	isFetching = true;

	// Fetching Pokémons part by part to make website usable as soon as posible
	try {
		const response = await fetch(`${API_BASE_URL}?offset=${offset}&limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch Pokémon list');
		const data = await response.json();

		const batchDetails = await Promise.all(
			data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
		);

		pokemonList.push(...batchDetails);
		// Display 20 Pokémons
		if (!isSearching) listPokemons(pokemonList.slice(0, 20));
		// Update search result as new Pokémon are being loaded
		else searchInput.dispatchEvent(new Event('input'))

	} catch (error) {
		console.error('Error fetching Pokémons data:', error);
	} finally {
		isFetching = false;
		updateProgress(Math.min(offset + limit, NUMBER_OF_POKEMONS));
		// Continue fetching the rest of the Pokémon in the background
		if (offset + limit < NUMBER_OF_POKEMONS)
	   		loadPokemons(offset + limit, limit);
	}
}

function updateProgress(currentCount) {
	const percentage = (currentCount / NUMBER_OF_POKEMONS*100).toFixed(2);
	progress.innerHTML = `${currentCount} out of ${NUMBER_OF_POKEMONS} (${percentage}%)`
}

// Displaying the details of the selected Pokémon
function displayPokemonDetails(pokemon) {
	detailsDiv.innerHTML = `
		<h2>${pokemon.name}</h2>
		<img src="${pokemon.sprites.other.showdown.front_default}" alt="${pokemon.name}" style="width:100px;height:100px;">
		<p><strong>Height:</strong> ${pokemon.height * 10} centimeters</p>
		<p><strong>Weight:</strong> ${pokemon.weight / 10} kilogrammes</p>
		<p><strong>Type:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
		<p><strong>Abilities:</strong> ${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
		<p><strong>Stats:</strong></p>
		<ul>
			${pokemon.stats.map(statInfo => `
				<li><strong>${statInfo.stat.name}:</strong> ${statInfo.base_stat}</li>
			`).join('')}
		</ul>
	`;
}


// Listing pokemons from given list, all or filtered Pokémons
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