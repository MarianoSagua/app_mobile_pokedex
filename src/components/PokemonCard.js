import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import GetColorByPokemonType from '../utils/GetColorByPokemonType';
import { useNavigation } from '@react-navigation/native';
import { capitalize } from 'lodash';

export default function PokemonCard({ pokemon }) {
    const { name, id, sprites, types } = pokemon;
    const navigation = useNavigation();

    const pokemonColor = GetColorByPokemonType(types[0].type.name);
    const containerStyles = { backgroundColor: pokemonColor, ...styles.container };

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Pokemon", {id: id})}>
        <View style={containerStyles}>
            <Text style={styles.textId}>#{`${id}`.padStart(2, 0)}</Text>
            <Image
                source={{ uri: sprites.front_default }}
                style={styles.image}
            />
            <Text style={styles.name}>{capitalize(name)}</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 130,
        padding: 10,
        margin: 5,
        borderRadius: 20
    },
    textId: {
        position: "absolute",
        right: 10,
        top: 10,
        color: "#fff"
    },
    image: {
        width: 90,
        height: 90,
        position: "absolute",
        bottom: 2,
        right: 2
    },
    name:{
        color: "white",
        marginTop: 10,
        fontSize: 16,
        fontWeight: 700
    }
})








