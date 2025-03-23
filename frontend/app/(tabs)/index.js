import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        width: "100%",
      }}
    >
      <View>
        <Text>Banner</Text>
      </View>
      <View>
        <Text>Toggle</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={styles.list}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Text>{item.name}</Text>
              <Text>{item.newPrice}</Text>
              <Link href={"../product/" + item._id}>View</Link>
            </View>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 0,
    borderColor: "black",
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
