import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchShop } from "../../../services/api";
import ProductCard from "../../../components/ProductCard";
import BackArrow from "../../../components/BackArrow";

const bags = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["shop", id],
    queryFn: fetchShop,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <BackArrow />
      <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 30 }}>
        {data.name}
      </Text>
      <FlatList
        data={data.products}
        contentContainerStyle={{ alignItems: "center", gap: 20 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <ProductCard
              width={300}
              height={250}
              bag={item}
              loading={isLoading}
            />
          );
        }}
      />
    </View>
  );
};

export default bags;
