import { View, Text, FlatList } from "react-native";
import React, { useState, useCallback } from "react";
import { fetchCart } from "../../services/api";
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
          renderItem={({ item }) => (
            <Text
              style={{
                marginBottom: 5,
                padding: 5,
                borderWidth: 1,
                borderRadius: 15,
              }}
            >
              {item.product.name} - {item.quantity}
            </Text>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
}
