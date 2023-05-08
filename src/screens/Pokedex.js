import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetDataApi, GetSinglePokemon } from '../api/GetDataApi';
import PokemonList from '../components/PokemonList';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const getData = async ()=>{
    try {
      setLoading(true);

      const response = await GetDataApi(nextUrl);
      setNextUrl(response.next);
      const pokemonsPromises = response.results.map((item) => GetSinglePokemon(item.url));
      const pokemonsData = await Promise.all(pokemonsPromises);
      setPokemons(pokemonsData);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getData();
  }, []);

  return (
    <View>
      {loading ?
        <>
          <View style={styles.loader}>
            <ActivityIndicator animating={true} color={MD2Colors.red800}  size={50} />
          </View>
        </>
        :
        <>
          <PokemonList nextUrl={nextUrl} getData={getData} items={pokemons} />
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  }
})


