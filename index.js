// importar los elementos

const pokemonId = document.querySelector("#pokeId");
const form = document.querySelector("form");
const PokemonCard = document.querySelector("#PokemonCard");
const searchMsg = document.querySelector(".search-msg")

// Direccion url

const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

// Funcion para obtener la data del pokemon consultado

const requestPokemon = async (pokemon) => {
    const response = await fetch(pokeUrl + pokemon);
    const data = await response.json();
    return data;    
};


// Funcion para extraer la data necesaria del pokemon

const getPokemonData = (pokemonData) => {
  return {
    image: pokemonData.sprites.other.home.front_default,
    name: pokemonData.name.toUpperCase(),
    height: pokemonData.height / 10,
    weight: pokemonData.weight / 10,
    types: pokemonData.types,
  };
};


// Funcion para crear el template del Pokemon buscado

const createPokemonCard = (pokemonData) => {
    const { image, name, height, weight, types } = getPokemonData(pokemonData);
    return `
      <div class="pokem">
          <img class="poke-img" src="${image}" alt="${image}-image">
          <h2>${name}</h2>
          
          <p class="height">Altura: ${height} m</p>
          <p class="weight">Peso: ${weight} Kg</p>
      </div>
    `;
  };
  

// Funcion para renderizar la card en el DOM

const renderPokemonCard = (pokemonData) => {
    PokemonCard.innerHTML = createPokemonCard(pokemonData)
}


// Funcion para validar que el input este vacio

const isEmptyInput = () => {
    return pokemonId.value.trim() === "";
}


// Funcion para validar si el id del Pokemon existe

const isInvalidPokemonId = (pokemonData) => {
    return !pokemonData.id;
}


// Funcion de busqueda y renderizado de la card en el Dom

const searchPokemon = async (e) => {
    e.preventDefault();

    if(isEmptyInput()) {
        alert("Debes ingresar el Id del Pokemon a Buscar")
        return;
    }

    const pokemon = pokemonId.value.trim();
    const fetchedPokemon = await requestPokemon(pokemon);

    if(isInvalidPokemonId(fetchedPokemon)) {
        alert("El Id ingresado no corresponde a ningun Pokemon registrado");
        form.reset();
        return
    }

    renderPokemonCard(fetchedPokemon)
}

const init = () => {
    form.addEventListener("submit", searchPokemon)
}

init();



