import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFavorites, removeFromFavorites } from "../../services/api.js";

const favorites = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites"], // Unique query key
    queryFn: fetchFavorites,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: true,
  });
  console.log(data);
  const remove = async (productId) => {
    try {
      await removeFromFavorites(productId);
      queryClient.invalidateQueries(["favorites"]);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: 50,
      }}
    >
      <Text>Wishlist</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data.length === 0 ? (
        <Text>Wishlist is empty</Text>
      ) : (
        <ScrollView>
          {data.map((item, key) => {
            return (
              <View key={key} style={styles.item}>
                <Text>
                  {item.product.name} - {item.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    remove(item.product._id);
                  }}
                >
                  <Text style={{ color: "red" }}>Remove</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default favorites;

const styles = StyleSheet.create({
  item: {
    marginBottom: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "80%",
    marginBottom: 20,
  },
});
