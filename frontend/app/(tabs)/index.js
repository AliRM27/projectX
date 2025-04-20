import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Pressable,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import React, { useState, useCallback } from "react";
import { fetchHome, fetchFavorites } from "../../services/api.js";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import Categorie from "../../components/Categorie.jsx";
import ProductCard from "../../components/ProductCard.jsx";

export default function index() {
  const [queries, setQuery] = useState(["all"]);

  const {
    data: data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["main", ...queries],
    queryFn: fetchHome,
    refetchInterval: 1000 * 60 * 5,
  });

  const updateQueries = (category) => {
    setQuery((prevQueries) => {
      if (category === "all") {
        return ["all"];
      }

      const newQueries = prevQueries.includes(category)
        ? prevQueries.filter((query) => query !== category)
        : [...prevQueries.filter((query) => query !== "all"), category];

      return newQueries.length === 0 ? ["all"] : newQueries;
    });
  };

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
          { marginTop: 25, marginLeft: 25, marginBottom: 35 })
        }
      >
        <Text style={styles.heading}>SnapShop</Text>
      </View>
      <ScrollView
        style={isLoading ? { backgroundColor: "transparent" } : {}}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ justifyContent: "center" }}
          showsHorizontalScrollIndicator={false}
        >
          <Categorie
            name={"all"}
            extra={{ marginLeft: 30 }}
            setQuery={updateQueries}
            queries={queries}
          />
          <Categorie
            name={"fashion"}
            setQuery={updateQueries}
            queries={queries}
          />
          <Categorie
            name={"cosmetic"}
            setQuery={updateQueries}
            queries={queries}
          />
          <Categorie name={"toys"} setQuery={updateQueries} queries={queries} />
          <Categorie name={"home"} setQuery={updateQueries} queries={queries} />
          <Categorie
            name={"accesoirs"}
            setQuery={updateQueries}
            queries={queries}
          />
        </ScrollView>
        <View style={styles.category}>
          <Text style={styles.category.txt}>For you</Text>
        </View>
        <ScrollView
          style={styles.list}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {isLoading ? (
            <ProductCard loading={true} />
          ) : (
            data["products"].map((item, key) => {
              return (
                <ProductCard
                  key={key}
                  title={item.title}
                  category={item.category}
                  price={item.newPrice}
                  originalPrice={item.oldPrice}
                  pickupTime={item.pickUpTime}
                  rating={4.5}
                  image={""}
                  onPress={() => alert("Pressed")}
                />
              );
            })
          )}
        </ScrollView>
        <View style={styles.category}>
          <Text style={styles.category.txt}>Fashion</Text>
        </View>
        <ScrollView
          style={styles.list}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {isLoading ? (
            <ProductCard loading={true} />
          ) : (
            data["products"].map((item, key) => {
              if (item.category !== "fashion") return;
              return (
                <ProductCard
                  key={key}
                  title={item.title}
                  category={item.category}
                  price={item.newPrice}
                  originalPrice={item.oldPrice}
                  pickupTime={item.pickUpTime}
                  rating={4.5}
                  image={""}
                  onPress={() => alert("Pressed")}
                />
              );
            })
          )}
        </ScrollView>
        <View style={styles.category}>
          <Text style={styles.category.txt}>Cosmetic</Text>
        </View>
        <ScrollView
          style={{ marginBottom: 70 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {isLoading ? (
            <ProductCard loading={true} />
          ) : (
            data["products"].map((item, key) => {
              if (item.category !== "cosmetic") return;
              return (
                <ProductCard
                  key={key}
                  title={item.title}
                  category={item.category}
                  price={item.newPrice}
                  originalPrice={item.oldPrice}
                  pickupTime={item.pickUpTime}
                  rating={4.5}
                  image={""}
                  onPress={() => alert("Pressed")}
                />
              );
            })
          )}
        </ScrollView>
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
  heading: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 25,
  },
  category: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    txt: {
      fontWeight: 500,
      fontSize: 20,
    },
  },
  list: {},
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
