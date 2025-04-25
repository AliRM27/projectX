import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import ArrowLeft from "../../assets/arrowleft.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchShop } from "../../services/api";

const shop = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["shop", id],
    queryFn: fetchShop,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  console.log(data.products);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        style={styles.image}
        source={{ uri: data.imageUrl }}
        resizeMode="cover"
      />
      <View>
        {data.products.map((bag, key) => {
          return (
            <Pressable
              key={key}
              onPress={() => router.push(`/product/${bag._id}`)}
            >
              <Text>{bag.title}</Text>
              <Text>{bag.oldPrice}</Text>
              <Text>{bag.newPrice}</Text>
            </Pressable>
          );
        })}
      </View>

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
