import { View, Text, Button, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { fetchProduct } from "../../services/api.js";

const product = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        onPress={() => {
          router.back();
        }}
        style={{ position: "absolute", top: 0, left: 0, padding: 10 }}
      >
        <Text>Back</Text>
      </Pressable>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <View>
          <Text>product - {id}</Text>
          <Text>{data.name}</Text>
          <Text>{data.description}</Text>
          <Text>{data.oldPrice}</Text>
          <Text>{data.newPrice}</Text>
          <Button title="Add to Cart" />
        </View>
      )}
    </View>
  );
};

export default product;
