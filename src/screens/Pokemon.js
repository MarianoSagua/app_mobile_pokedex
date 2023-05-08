import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GetPokemonDetails } from "../api/GetDataApi";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import Header from "../components/Header";
import Type from "../components/Type";
import Stats from "../components/Stats";
import { AntDesign } from "@expo/vector-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../FirebaseConfig";
import { showMessage } from "react-native-flash-message";
import { doc, updateDoc } from "firebase/firestore";
import { UseUserLoged } from "../hooks/UseUserLoged";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function Pokemon({ route, navigation }) {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(null);
  const [favoriteState, setFavoriteState] = useState(!false);
  const [user] = useAuthState(auth);
  const userLoged = UseUserLoged();

  const getData = async () => {
    try {
      setLoading(true);

      const response = await GetPokemonDetails(route.params.id);
      setPokemon(response);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => (
        <AntDesign
          name="arrowleft"
          size={24}
          style={styles.arrow}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, route.params]);

  const handleFavorite = () => {
    if (user !== null) {
      setFavoriteState(!favoriteState);

      if (favoriteState === true) {
        try {
          const userDocRef = doc(db, "usersPokedexAppMobile", userLoged.id);
          const pokemonFavData = {
            name: pokemon.name,
            id: pokemon.id,
            image: pokemon.sprites.front_default
          }
          updateDoc(userDocRef, {
            favoritos: firebase.firestore.FieldValue.arrayUnion(pokemonFavData),
          });
        } catch (error) {
          showMessage({
            message: error,
            type: "info",
          });
        }
      }
    } else {
      setFavoriteState(false);
      showMessage({
        message: "You must log in first before adding a favorite!",
        type: "info",
      });
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={50}
          />
        </View>
      ) : (
        pokemon &&
        pokemon.types &&
        pokemon.sprites && (
          <>
            <Header
              name={pokemon.name}
              id={pokemon.id}
              image={pokemon.sprites.front_default}
              type={pokemon.types[0].type.name}
            />

            <TouchableOpacity onPress={handleFavorite}>
              {favoriteState ? (
                <AntDesign
                  style={styles.heart}
                  name="hearto"
                  size={24}
                  color="black"
                />
              ) : (
                <AntDesign
                  style={styles.heart}
                  name="heart"
                  size={24}
                  color="black"
                />
              )}
            </TouchableOpacity>

            <Type types={pokemon.types} />
            <Stats stats={pokemon.stats} types={pokemon.types} />
          </>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "white",
  },
  heart: {
    alignSelf: "center",
    marginTop: 20,
  },
});
