import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { fetchHome } from "../../services/api.js";

export default function index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
      }}
    >
      <View>
        <Text>Banner</Text>
      </View>
      <View>
        <Text>Toggle</Text>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <View>
            {data.map((obj, index) => {
              return <Text key={index}>{obj.name}</Text>;
            })}
          </View>
        )}
      </View>
    </View>
  );
}
