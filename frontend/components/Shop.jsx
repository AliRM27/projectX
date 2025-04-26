import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import ProductCard from "./ProductCard";

const Shop = ({ item, loading }) => {
  if (loading) {
    return <ProductCard loading={true} />;
  }

  return (
    <Pressable
      style={styles.shop}
      onPress={() => router.push("../shop/" + item._id)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.address} numberOfLines={2}>
          {item.location.adress}, {item.location.postalCode}{" "}
        </Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shop: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    width: 300,
    margin: 10,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow blur radius for iOS
  },
  image: {
    height: 150,
  },
  details: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
});

export default Shop;
