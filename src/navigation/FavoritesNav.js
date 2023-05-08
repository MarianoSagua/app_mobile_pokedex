import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favs from "../screens/Favs";
import Pokemon from "../screens/Pokemon";

const Stack = createNativeStackNavigator();

export default function FavoritesNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favs" component={Favs} />
    </Stack.Navigator>
  );
}
