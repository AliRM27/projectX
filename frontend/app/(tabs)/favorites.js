import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFavorites, removeFromFavorites } from "../../services/api.js";

const favorites = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: true,
  });
  const queryClient = useQueryClient();

  const remove = async (productId) => {
    try {
      await removeFromFavorites(productId);
    } catch (error) {
      console.error(error);
    } finally {
      queryClient.refetchQueries({ queryKey: ["products"] });
      refetch();
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
      ) : data.items.length === 0 ? (
        <Text>Wishlist is empty</Text>
      ) : (
        <ScrollView>
          {data.items.map((item, key) => {
            return (
              <View key={key} style={styles.item}>
                <Text>{item.product.name}</Text>
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
