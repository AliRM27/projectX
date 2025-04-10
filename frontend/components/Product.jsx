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
import { Link, router } from "expo-router";

const Product = ({ item }) => {
  const [liked, setLiked] = useState(false);
  return (
    <View style={styles.product} onPress={() => alert("Product clicked")}>
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
            {item.oldPrice}€
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {item.newPrice}€
          </Text>
        </View>
      </TouchableOpacity>
      <Pressable style={{ position: "absolute", bottom: 10, right: 10 }}>
        {liked ? (
          <Like
            fill={"red"}
            onPress={() => setLiked(false)}
            width={25}
            height={25}
          />
        ) : (
          <Like
            fill={"transparent"}
            onPress={() => setLiked(true)}
            width={25}
            height={25}
          />
        )}
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
