const pokemonHTMLList = document.getElementById('list');
const pokemonList = [];
const searchInput = document.getElementById('search');

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

let isFetching = false;
let isSearching = false;

async function loadPokemons(offset = 0, limit = 20) {
    if (isFetching || isSearching) return
    isFetching = true;

	// Fetching pokemons part by part to make website usable as soon as posible
    try {
        const response = await fetch(`${API_BASE_URL}?offset=${offset}&limit=${limit}`);
        const data = await response.json();

        const batchDetails = await Promise.all(
            data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
        );

        pokemonList.push(...batchDetails);
        listPokemons(batchDetails);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    } finally {
        isFetching = false;
		// Loading rest of the pokemons in the background
		if (!isSearching)
        	loadPokemons(offset + limit, limit);
    }
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