import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import React, { useState, useCallback } from "react";
import { fetchCart, removeFromCart } from "../../services/api";
import { useFocusEffect } from "expo-router";

export default function cart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const result = await fetchCart();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (productId) => {
    setLoading(true);
    try {
      await removeFromCart(productId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      loadData();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );
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
      {loading ? (
        <Text>Loading...</Text>
      ) : data.items.length === 0 ? (
        <Text>Cart is empty</Text>
      ) : (
        <FlatList
          data={data.items}
          contentContainerStyle={{
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            <View
              style={{
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
              }}
            >
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
              {/* <Button
                title="Remove"
                onPress={remove.bind(null, item.product._id)}
              /> */}
            </View>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
}
