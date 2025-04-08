import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Shop = ({ item }) => {
  return (
    <View style={styles.shop}>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  shop: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    width: 150,
    height: 200,
    borderRadius: 10,
  },
});

export default Shop;
