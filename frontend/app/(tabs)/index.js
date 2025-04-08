import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import React, { useState } from "react";
import { fetchHome } from "../../services/api.js";
import { useQuery } from "@tanstack/react-query";
import Product from "../../components/Product.jsx";
import Shop from "../../components/Shop.jsx";

export default function index() {
  const [state, setState] = useState("products");

  const { data, isLoading, error } = useQuery({
    queryKey: [state], // Unique query key
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
      <ScrollView>
        <View style={(styles.banner, { alignItems: "center", marginTop: 20 })}>
          <Image
            source={require("../../assets/banner.png")}
            style={{ width: "100%", height: 200 }}
          />
        </View>
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[
              styles.button,
              state === "products" ? styles.active : styles.inactive,
            ]}
            onPress={() => setState("products")}
          >
            <Text
              style={
                state === "products" ? { color: "white" } : { color: "black" }
              }
            >
              Products
            </Text>
          </TouchableOpacity>
          <View
            style={{ backgroundColor: "black", width: 1, height: 40 }}
          ></View>
          <TouchableOpacity
            style={[
              styles.button,
              state === "shops" ? styles.active : styles.inactive,
            ]}
            onPress={() => setState("shops")}
          >
            <Text
              style={
                state === "shops" ? { color: "white" } : { color: "black" }
              }
            >
              Shops
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          {data[state].map((item, key) => {
            return state === "products" ? (
              <Product key={key} item={item} />
            ) : (
              <Link
                href={"../shop/" + item._id}
                key={key}
                style={{ margin: 10 }}
              >
                <Shop item={item} />
              </Link>
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
