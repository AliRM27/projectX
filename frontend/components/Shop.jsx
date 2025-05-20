import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import SkeletonBox from "./Skeleton";
import Like from "../assets/svgs/like.svg";
import { useFavorites } from "../context/favoriteContext";

const Shop = ({ item, loading }) => {
  if (loading) {
    return (
      <View style={styles.shop}>
        <SkeletonBox height={160} width="100%" />
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <SkeletonBox
            height={17}
            width="60%"
            style={{ marginBottom: 8, marginTop: 8 }}
          />
          <SkeletonBox height={12} width="40%" style={{ marginBottom: 6 }} />
          <SkeletonBox height={12} width="80%" style={{ marginBottom: 8 }} />
        </View>
      </View>
    );
  }

  const [rotation, setRotation] = useState(new Animated.Value(0));
  const { toggleFavorite, isFavorite } = useFavorites();
  const isShopFavorite = isFavorite(item._id.toString());

  const handlePress = () => {
    toggleFavorite(item._id.toString());
    !isShopFavorite &&
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setRotation(new Animated.Value(0)); // Reset rotation after animation
      });
  };
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Pressable
      style={[styles.shop, { opacity: item.products.length === 0 ? 0.6 : 1 }]}
      onPress={() => router.push("../shop/" + item._id)}
      disabled={item.products.length === 0}
    >
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          backgroundColor: "rgb(255, 252, 177)",
          padding: 5,
          borderRadius: 15,
          minWidth: 80,
          alignItems: "center",
        }}
      >
        <Text>
          {item.products.length
            ? item.products.length + " items"
            : "Not available"}
        </Text>
      </View>
      <Animated.View
        style={{
          transform: [{ rotate: rotateInterpolate }],
          zIndex: 1,
        }}
      >
        <Pressable style={styles.like} onPress={() => handlePress()}>
          <Like
            width={25}
            height={25}
            stroke="yellow"
            fill={isShopFavorite ? "rgb(0, 0, 0)" : "transparent"}
          />
        </Pressable>
      </Animated.View>
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
          {item.location.adress}, {item.location.postalCode},{" "}
          {item.location.city}
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
    width:
      Dimensions.get("screen").width > 500
        ? 400
        : Dimensions.get("screen").width * 0.9,
    height: 250,
    marginVertical: 10,
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
  like: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.49)",
    padding: 5,
    borderRadius: 50,
  },
});

export default Shop;
