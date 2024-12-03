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
			// List first 20 pokemons
			if (pokemonHTMLList.children.length < 20) {
				const listItem = document.createElement('li');
				const img = document.createElement('img');
				img.src = pokemonData.sprites.front_default;
				img.alt = pokemon.name;
				img.style.width = '60px';
				img.style.height = '60px';
				listItem.appendChild(img);
				listItem.appendChild(document.createTextNode(pokemon.name));
				listItem.onclick = () => displayPokemonDetails(pokemonData);
				pokemonHTMLList.appendChild(listItem);
			}
		}
	} catch (error) {console.error('Error fetching Pokemon data:', error); }
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

searchInput.addEventListener('input', () => {
	const searchTerm = searchInput.value.toLowerCase();
	const filteredPokemons = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
	// List searched pokemons
	pokemonHTMLList.innerHTML = '';
	filteredPokemons.slice(0, 20).forEach(pokemon => {
		const listItem = document.createElement('li');
		const img = document.createElement('img');
		img.src = pokemon.sprites.front_default;
		img.alt = pokemon.name;
		img.style.width = '60px';
		img.style.height = '60px';
		listItem.appendChild(img);
		listItem.appendChild(document.createTextNode(pokemon.name));
		listItem.onclick = () => displayPokemonDetails(pokemonData);
		pokemonHTMLList.appendChild(listItem);
	});
});

loadPokemons();