import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { fetchProduct, addToCart } from "../../services/api.js";
import { useQueryClient } from "@tanstack/react-query";
import BackArrow from "../../components/BackArrow.jsx";

const product = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const add = async () => {
    setLoading(true);
    try {
      await addToCart(id, 1);
    } catch (error) {
      console.error("Failed to add to cart");
    } finally {
      queryClient.refetchQueries({ queryKey: ["cart"] });
      setLoading(false);
      alert("Added to cart");
    }
  };

  const loadData = async () => {
    try {
      const result = await fetchProduct(id);
      setData(result);
    } catch (error) {
      console.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <BackArrow />
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <View style={{ alignItems: "center", width: "100%" }}>
          <Image
            source={require("../../assets/examples/nikeShoe.png")}
            style={{
              width: 350,
              height: 350,
              borderRadius: 10,
              marginBottom: 20,
              marginTop: 50,
            }}
          />
          <View>
            <Text style={{ fontSize: 30, marginBottom: 10 }}>{data.name}</Text>
            <Text style={{ fontSize: 15, marginBottom: 100 }}>
              {data.description}
            </Text>
            <Text
              style={{
                fontSize: 20,
                textDecorationLine: "line-through",
                color: "grey",
              }}
            >
              {data.oldPrice}€
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {data.newPrice}€
            </Text>
          </View>
          <TouchableOpacity
            onPress={add}
            style={{
              marginTop: 40,
              backgroundColor: "black",
              padding: 20,
              width: 350,
              borderRadius: 10,
            }}
            activeOpacity={0.8}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 15 }}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default product;
