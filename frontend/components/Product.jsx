import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import React from "react";

const Product = ({ item }) => {
  return (
    <View style={styles.product}>
      <Text>{item.name}</Text>
      <Text>{item.newPrice}</Text>
      <Link href={"../product/" + item._id}>View</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 10,
  },
});

export default Product;
