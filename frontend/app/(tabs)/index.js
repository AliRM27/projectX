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
import nike from "../../assets/examples/nikeShoe.png";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const [queries, setQuery] = useState(["all"]);
  const sampleData = {
    shops: [
      {
        _id: "238472348958wsdo347",
        name: "Nike",
        category: "fashion",
        location: {
          adress: "Lohweg",
          postalCode: 40547,
          city: "Duesseldorf",
          country: "Germany",
        },
        contact: "+491794403058",
        products: [],
        description: "lshgfksgf",
        imageUrl: nike,
        rating: 0,
      },
      {
        _id: "238472348958wsdo347",
        name: "PeekAClopenburg",
        category: "fashion",
        location: {
          adress: "Koenigsalee",
          postalCode: 40397,
          city: "Duesseldorf",
          country: "Germany",
        },
        contact: "+491794403058",
        products: [],
        description: "lshgfksgf",
        imageUrl: nike,
        rating: 0,
      },
      {
        _id: "23847asd323tewe47",
        name: "Sephora",
        category: "cosmetic",
        location: {
          adress: "Lohweg",
          postalCode: 40547,
          city: "Duesseldorf",
          country: "Germany",
        },
        contact: "+491794403058",
        products: [],
        description: "lshgfksgf",
        imageUrl: nike,
        rating: 0,
      },
      {
        _id: "238472udsh834347",
        name: "Muller",
        category: "toys",
        location: {
          adress: "Dielfestr. 47",
          postalCode: 50219,
          city: "Siegen",
          country: "Germany",
        },
        contact: "+491794403058",
        products: [],
        description: "lshgfksgf",
        imageUrl: nike,
        rating: 0,
      },
    ],
  };

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

        {/*Use map to render the Sections*/}

        <Section
          shops={data ? data["shops"] : sampleData["shops"]}
          isLoading={isLoading}
          isFirst={true}
          name={"For you"}
          queries={queries}
        />
        <Section
          shops={data ? data["shops"] : sampleData["shops"]}
          isLoading={isLoading}
          name={"Fashion"}
          queries={queries}
        />
        <Section
          shops={data ? data["shops"] : sampleData["shops"]}
          isLoading={isLoading}
          name={"Cosmetic"}
          queries={queries}
        />
        <Section
          shops={data ? data["shops"] : sampleData["shops"]}
          isLoading={isLoading}
          isLast={true}
          name={"Toys"}
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
