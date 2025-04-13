import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Like from "../assets/like.svg";
import { router } from "expo-router";
import { addToFavorites, removeFromFavorites } from "../services/api";
import { useQueryClient } from "@tanstack/react-query";

const Product = ({ item, favorite }) => {
  const [liked, setLiked] = useState(favorite);
  const queryClient = useQueryClient();

  const handleLike = async () => {
    try {
      if (!liked) {
        await addToFavorites(item._id); // Add to wishlist
      } else {
        await removeFromFavorites(item._id); // Remove from wishlist
      }
      setLiked(!liked); // Toggle the liked state
      queryClient.invalidateQueries(["favorites"]); // Refresh the wishlist data
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <View style={styles.product}>
      <TouchableOpacity
        onPress={() => router.push(`/product/${item._id}`)}
        activeOpacity={0.9}
      >
        <Image
          source={require("../assets/examples/nikeShoe.png")}
          style={styles.productImage}
        />
        <View style={styles.description}>
          <Text style={{ width: 150, fontSize: 17, marginBottom: 10 }}>
            {item.name}
          </Text>
          <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
            {item.oldPrice}€{item.isFavorite}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {item.newPrice}€
          </Text>
        </View>
      </TouchableOpacity>
      <Pressable
        style={{ position: "absolute", bottom: 10, right: 10 }}
        onPress={handleLike}
      >
        <Like
          fill={liked ? "black" : "transparent"} // Red if liked, transparent otherwise
          width={25}
          height={25}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    margin: 10,
  },
  description: {
    borderWidth: 0,
    padding: 10,
    backgroundColor: "rgb(250, 233, 186)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  productImage: {
    width: 170,
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Product;
