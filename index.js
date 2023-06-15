// importar los elementos

const pokemonId = document.querySelector("#pokeId");
const searchButton = document.querySelector("#searchButton");
const PokemonCard = document.querySelector("#PokemonCard");

// Direccion url

const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

// funcion para el llamado de la api para retornar la data necesaria

const pokeFetch = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Funcion para extraer la data necesaria del pokemon

const pokemonTemplate = (pokemon) => {
  return {
    image: pokemon.sprites.other.home.front_default,
    name: pokemon.name.toUpperCase(),
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    types: pokemon.types,
  };
};

// Funcion para desglosar los tipos en la card del Pokemon

const createTypeCards = (types) => {
  return types
    .map((tipo) => {
      return `<span class="type">${tipo.type.name}</span>`;
    })
    .join("");
};

// Funcion para crear la card del Pokemon

const createPokemonCard = (pokemon) => {
  const { image, name, height, weight, types } = pokemonTemplate(pokemon);
  return `
    <div class="pokem">
        <img src="${image}" alt="${image}-image">
        <h2>${name}</h2>
        <div class="pokeTypes">
            ${createTypeCards(types)}
        </div>
        <p class="height">Altura: ${height} m</p>
        <p class="weight">Peso: ${weight} Kg</p>
    </div>
  `;
};

// Funcion para renderizar la pokemon Card

const renderPokemon = (pokemon) => {
    PokemonCard.innerHTML = createPokemonCard(pokemon)
}

searchButton.addEventListener("click", (e) => {
  console.log(pokeFetch(pokeUrl + pokemonId.value));
});
