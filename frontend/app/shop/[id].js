import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import ArrowLeft from "../../assets/svgs/arrowleft.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchShop } from "../../services/api";
import ProductCard from "../../components/ProductCard";

const shop = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["shop", id],
    queryFn: fetchShop,
  });

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {isLoading ? (
        <ProductCard loading={true} />
      ) : (
        <Image
          style={styles.image}
          source={{ uri: data.imageUrl }}
          resizeMode="cover"
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <ProductCard loading={true} />
        ) : (
          data.products.map((bag, key) => {
            return <ProductCard bag={bag} key={key} />;
          })
        )}
      </ScrollView>

      {/* <Pressable
        onPress={() => router.back()}
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        <ArrowLeft />
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200, // adjust height as needed
  },
});

export default shop;
