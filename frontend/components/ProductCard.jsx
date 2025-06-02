// ProductCard.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SkeletonBox from "./Skeleton";
import { router } from "expo-router";

const ProductCard = ({
  bag,
  loading = false, // 👈 Add a loading prop
  width,
  height,
}) => {
  if (loading) {
    return (
      <View style={styles.card}>
        <SkeletonBox height={180} width="100%" />
        <View style={styles.content}>
          <SkeletonBox height={20} width="60%" style={{ marginBottom: 8 }} />
          <SkeletonBox height={14} width="40%" style={{ marginBottom: 6 }} />
          <SkeletonBox height={14} width="80%" style={{ marginBottom: 12 }} />
          <SkeletonBox height={20} width="50%" />
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { width, height }]}
      activeOpacity={0.85}
      disabled={bag.quantity === 0 ? true : false}
      onPress={() => {
        router.push("product/" + bag._id);
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
          backgroundColor: "white",
          borderRadius: width === 200 ? 50 : 8,
          padding: 4,
          width: width === 200 ? 30 : null,
          height: width === 200 ? 30 : null,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          {bag.quantity}
          {width === 200 ? "" : "+ bags left"}
        </Text>
      </View>
      <View style={{ width: "100%", height: "50%" }}>
        <Image
          source={require("../assets/examples/nikeShoe.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text
          style={[styles.title, { fontSize: width === 200 ? 14 : 17 }]}
          numberOfLines={2}
        >
          {bag.title}
        </Text>
        <Text style={styles.pickup}>Today {bag.pickUpTime}</Text>

        <View style={styles.priceContainer}>
          <Text style={[styles.price, { fontSize: width === 200 ? 14 : 16 }]}>
            ${bag.newPrice.toFixed(2)}
          </Text>
          {bag.oldPrice && (
            <Text
              style={[
                styles.originalPrice,
                { fontSize: width === 200 ? 12 : 14 },
              ]}
            >
              ${bag.oldPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderColor: "#e5e7eb",
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 14,
    gap: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1f2937",
  },
  category: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  pickup: {
    fontSize: 13,
    color: "#374151",
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontWeight: "bold",
    color: "#10b981",
    marginRight: 6,
  },
  originalPrice: {
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  rating: {
    fontSize: 13,
    color: "#f59e0b",
  },
});

export default ProductCard;
