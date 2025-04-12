import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { fetchCart, removeFromCart } from "../../services/api";
import { useQuery } from "@tanstack/react-query";

export default function cart() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["cart"], // Unique query key
    queryFn: fetchCart,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: true,
  });

  const remove = async (productId) => {
    try {
      const response = await removeFromCart(productId);
    } catch (error) {
      console.error(error);
    } finally {
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
      <Text>Cart</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data.items.length === 0 ? (
        <Text>Cart is empty</Text>
      ) : (
        <ScrollView>
          {data.items.map((item, key) => {
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
}

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
