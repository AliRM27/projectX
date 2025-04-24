import { View, Text, Pressable } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import ArrowLeft from "../../assets/arrowleft.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/api";

const shop = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["shop", id],
    queryFn: fetchProducts,
  });

  console.log(data);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        onPress={() => router.back()}
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        <ArrowLeft />
      </Pressable>
      <Text>{data[0].title}</Text>
    </View>
  );
};

export default shop;
