import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchProducts } from "../../services/api";
import Product from "../../components/Product";
import { router } from "expo-router";
import ArrowBack from "../../assets/arrowleft.svg";

const shop = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const result = await fetchProducts(id);
      setData(result);
    } catch (error) {
      console.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Pressable
        onPress={() => {
          router.back();
        }}
        style={{ position: "absolute", top: 0, left: 0, padding: 10 }}
      >
        <ArrowBack width={30} height={30} />
      </Pressable>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            height: "100%",
            padding: 10,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              margin: 10,
              borderBottomWidth: 3,
              paddingBottom: 5,
            }}
          >
            {data[data.length - 1].name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              margin: 10,
              borderBottomWidth: 3,
              paddingBottom: 5,
            }}
          >
            {data[data.length - 1].location}
          </Text>
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {data.slice(0, -1).map((item, key) => {
              return <Product key={key} item={item} />;
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default shop;
