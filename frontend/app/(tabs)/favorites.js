import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useFavorites } from "../../context/favoriteContext";
import { useQuery } from "@tanstack/react-query";
import { fetchFavorites, fetchShops } from "../../services/api";
import Shop from "../../components/Shop";

const favorites = () => {
  const { favorites } = useFavorites();
  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchShops,
    enabled: favorites.length > 0, //
  });

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>No favorites</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const favoriteShops = data.filter((shop) =>
    favorites.includes(shop._id.toString())
  );

  return (
    <View style={styles.container}>
      <Text>Your Favorites:</Text>
      <ScrollView>
        {favoriteShops.map((shop, key) => (
          <Shop key={key} item={shop} />
        ))}
      </ScrollView>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Total Favorites: {favoriteShops.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default favorites;
