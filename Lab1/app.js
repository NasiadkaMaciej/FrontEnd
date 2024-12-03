const pokemonHTMLList = document.getElementById('list');
const pokemonList = [];
const searchInput = document.getElementById('search');

async function loadPokemons() {
	try {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000');
		const data = await response.json();
		for (const pokemon of data.results) {
			const pokemonResponse = await fetch(pokemon.url);
			const pokemonData = await pokemonResponse.json();
			pokemonList.push(pokemonData);
		}
		listPokemons(pokemonList)
	} catch (error) { console.error('Error fetching Pokemon data:', error); }
}

function displayPokemonDetails(pokemon) {
	const detailsDiv = document.getElementById('details');
	detailsDiv.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" style="width:100px;height:100px;">
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Type: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;
}

function listPokemons(pokemons) {
	pokemonHTMLList.innerHTML = '';
	pokemons.slice(0, 20).forEach(pokemon => {
		const listItem = document.createElement('li');
		const img = document.createElement('img');
		img.src = pokemon.sprites.front_default;
		img.alt = pokemon.name;
		listItem.appendChild(img);
		listItem.appendChild(document.createTextNode(pokemon.name));
		listItem.onclick = () => displayPokemonDetails(pokemon);
		pokemonHTMLList.appendChild(listItem);
	});
}

searchInput.addEventListener('input', () => {
	const searchTerm = searchInput.value.toLowerCase();
	const filteredPokemons = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
	listPokemons(filteredPokemons);
});

loadPokemons();