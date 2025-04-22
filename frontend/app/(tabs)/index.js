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
import Shop from "../../components/Shop.jsx";
import Section from "../../components/Section.jsx";

export default function index() {
  const [queries, setQuery] = useState(["all"]);

  const { data, isLoading, error, refetch } = useQuery({
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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
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
        <Section
          shops={data["shops"]}
          isLoading={isLoading}
          isFirst={true}
          name={"For you"}
          queries={queries}
        />
        <Section
          shops={data["shops"]}
          isLoading={isLoading}
          name={"Fashion"}
          queries={queries}
        />
        <Section
          shops={data["shops"]}
          isLoading={isLoading}
          isLast={true}
          name={"Cosmetic"}
          queries={queries}
        />
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
