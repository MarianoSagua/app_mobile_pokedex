import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GetColorByPokemonType from "../utils/GetColorByPokemonType";
import { capitalize } from "lodash";

export default function Type({ types }) {
  return (
    <View style={styles.content}>
      {types &&
        types.map((item, idx) => {
          return (
            <View
              key={idx}
              style={{
                ...styles.pill,
                backgroundColor: GetColorByPokemonType(item.type.name),
              }}
            >
              <Text>{capitalize(item.type.name)}</Text>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});
