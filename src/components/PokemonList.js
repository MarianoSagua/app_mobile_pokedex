import { FlatList, Platform, StyleSheet } from "react-native";
import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import { ActivityIndicator } from "react-native-paper";

export default function PokemonList({ items, getData, nextUrl }) {
  const [refreshing, setRefreshing] = useState(false);

  const loadMore = async () => {
    await getData();
  };

  const refreshData = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={items}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={nextUrl && loadMore}
      ListFooterComponent={
        nextUrl && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="#AEAEAE"
          />
        )
      }
      onRefresh={refreshData}
      refreshing={refreshing}
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 50 : 0,
  },
  spinner: {
    marginTop: 60,
    marginBottom: Platform.OS === "android" ? 90 : 0,
  },
});
