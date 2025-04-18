import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Link } from "expo-router";
import React, { useState, useCallback } from "react";
import { fetchHome, fetchFavorites } from "../../services/api.js";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import Product from "../../components/Product.jsx";
import Shop from "../../components/Shop.jsx";
import { useRemoved } from "../../context/favoriteContext.js";

export default function index() {
  const {
    data: data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["home", "all"], // Unique query key
    queryFn: fetchHome,
    refetchInterval: 1000 * 60 * 5,
  });

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>No data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={
          (styles.container,
          { marginTop: 25, marginLeft: 15, paddingBottom: 15 })
        }
      >
        <Text style={styles.heading}>SnapShop</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <View style={styles.list}>
          {data["products"].map((item, key) => {
            return (
              <View key={key} style={{ margin: 10 }}>
                <Text>A Shop</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 0,
    borderColor: "black",
    width: "100%",
  },
  banner: {},
  heading: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 25,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "black",
    paddingBottom: 50,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 37,
    margin: 20,
    gap: 10,
  },
  button: {
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
    borderRadius: 10,
    height: 40,
    backgroundColor: "white",
  },
  active: {
    backgroundColor: "black",
    color: "white",
  },
  inactive: {
    backgroundColor: "white",
    color: "black",
  },
});
