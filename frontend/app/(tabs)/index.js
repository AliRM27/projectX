import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import React from "react";
import { fetchHome } from "../../services/api.js";
import { useQuery } from "@tanstack/react-query";

export default function index() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"], // Unique query key
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
        <View>
          <Text>Shops</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <View style={styles.list}>
            {data["products"].map((item, key) => {
              return (
                <View key={key} style={styles.product}>
                  <Text>{item.name}</Text>
                  <Text>{item.newPrice}</Text>
                  <Link href={"../product/" + item._id}>View</Link>
                </View>
              );
            })}
          </View>
        )}
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
  product: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 10,
  },
});
