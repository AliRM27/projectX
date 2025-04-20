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

const SkeletonBox = ({ height, width, style }) => (
  <View
    style={[
      {
        backgroundColor: "#e5e7eb",
        borderRadius: 8,
        height,
        width,
      },
      style,
    ]}
  />
);

const ProductCard = ({
  image,
  title,
  category,
  pickupTime,
  price,
  originalPrice,
  rating,
  onPress,
  loading = false, // 👈 Add a loading prop
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
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={require("../assets/examples/nikeShoe.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.pickup}>🕒 {pickupTime}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            {originalPrice && (
              <Text style={styles.originalPrice}>
                ${originalPrice.toFixed(2)}
              </Text>
            )}
          </View>
          {rating !== undefined && (
            <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
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
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    width: 300,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 14,
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
    marginTop: 6,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 14,
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  rating: {
    fontSize: 13,
    color: "#f59e0b",
  },
});

export default ProductCard;
