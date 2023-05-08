import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import React from "react";
import GetColorByPokemonType from "../utils/GetColorByPokemonType";
import { capitalize } from "lodash";

export default function Header({ name, id, image, type }) {
  const color = GetColorByPokemonType(type);
  const containerStyles = { backgroundColor: color, ...styles.container };

  return (
    <SafeAreaView style={containerStyles}>
      <SafeAreaView style={styles.titles}>
        <Text style={styles.name}>{capitalize(name)}</Text>
        <Text style={styles.textId}>#{`${id}`.padStart(2, 0)}</Text>
      </SafeAreaView>

      <Image source={{ uri: image }} style={styles.image} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    transform: [{ scaleX: 2 }],
  },
  image: {
    width: 200,
    height: 200,
  },
  titles: {
    width: 190,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70,
  },
  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  textId: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#fff",
  },
});
