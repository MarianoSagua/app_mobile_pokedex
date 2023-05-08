import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { capitalize } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { useData } from "../context/DataContext";

export default function ItemFavPokemon({ item }) {
  const { id, image, name } = item;
  const navigation = useNavigation();
  const { deleteFav } = useData();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.name}>{capitalize(name)}</Text>
      <Text style={styles.id}>#{id}</Text>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => deleteFav(item)}>
          <Text style={styles.linkText}>Eliminar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Pokemon", {id: id})}>
          <Text style={styles.linkText}>Ir al pokemon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 200,
    alignSelf: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  id: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  linkText: {
    color: "blue",
    fontWeight: "bold",
    marginTop: 10,
    
  },
  links:{
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});
