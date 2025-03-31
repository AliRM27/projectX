import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Link, useFocusEffect } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { fetchHome } from "../../services/api.js";

export default function index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const result = await fetchHome();
      setData(result.products);
    } catch (error) {
      console.error("Failed to load data");
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
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          // <FlatList
          //   style={{ width: "100%" }}
          //   contentContainerStyle={styles.list}
          //   data={data}
          //   numColumns={2}
          //   renderItem={({ item }) => (
          //     <View style={styles.product}>
          //       <Text>{item.name}</Text>
          //       <Text>{item.newPrice}</Text>
          //       <Link href={"../product/" + item._id}>View</Link>
          //     </View>
          //   )}
          //   refreshing={refreshing}
          //   onRefresh={handleRefresh}
          // />
          <View style={styles.list}>
            {data.map((item, key) => {
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
