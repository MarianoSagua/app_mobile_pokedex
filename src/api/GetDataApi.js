export const GetDataApi = async (urlNext) => {
  try {
    const URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0.`;
    const response = await fetch(urlNext || URL);
    const result = await response.json();
    
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const GetSinglePokemon = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const GetPokemonDetails = async (id) => {
  try {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(URL);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
