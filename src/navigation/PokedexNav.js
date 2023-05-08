import { View, Text } from "react-native";
import React from "react";
import Pokedex from "../screens/Pokedex";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pokemon from "../screens/Pokemon";

const Stack = createNativeStackNavigator();

export default function PokedexNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={Pokedex}
        options={{ title: "", headerTransparent: true }}
      />

      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{ title: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}
