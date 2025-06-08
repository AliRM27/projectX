import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchHome, fetchCategories } from "../../services/api.js";
import { useQuery } from "@tanstack/react-query";
import Category from "../../components/Category.jsx";
import Section from "../../components/Section.jsx";
import { sampleData } from "../../utils/samlpeDatas.js";
import { useCategories } from "../../context/categoriesContext.js";
import { useUserLocation } from "../../context/UserLocationContext.js";
import { useRequestLocation } from "../../hooks/useRequestLocation.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function index() {
  const [queries, setQuery] = useState(["all"]);
  const { categories: categoriesContext, setCategories } = useCategories();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["main", ...queries],
    queryFn: fetchHome,
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategories(categories);
    }
  }, [isLoadingCategories]);

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

  const { location, setLocationState } = useUserLocation();
  const { requestAndSetLocation } = useRequestLocation();

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 25,
          marginBottom: 35,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text style={styles.heading}>SnapShop</Text>
        {location ? (
          <Text
            numberOfLines={2}
            style={{ textAlign: "center" }}
            onPress={async () => {
              await AsyncStorage.removeItem("user_location");
              setLocationState(null);
            }}
          >
            Your location {location.latitdue} {location.longitude}
          </Text>
        ) : (
          <TouchableOpacity onPress={requestAndSetLocation}>
            <Text style={{ textDecorationLine: "underline" }}>
              Find Shops Near Me
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={isLoading ? { backgroundColor: "transparent" } : {}}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              refetch();
              refetchCategories();
            }}
          />
        }
      >
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ justifyContent: "center" }}
          showsHorizontalScrollIndicator={false}
        >
          {isLoadingCategories
            ? Array.from({ length: 5 }, (_, index) => (
                <Category
                  isLoading={true}
                  key={index}
                  extra={index === 0 ? { marginLeft: 20 } : {}}
                />
              ))
            : categories.map((category, key) => {
                return (
                  <Category
                    name={category.name}
                    extra={key === 0 ? { marginLeft: 20 } : {}}
                    setQuery={updateQueries}
                    queries={queries}
                    key={key}
                  />
                );
              })}
        </ScrollView>
        {isLoading || isLoadingCategories
          ? Array.from({ length: 5 }, (_, index) => (
              <Section isLoading={true} key={index} />
            ))
          : categories.map((category, key) => {
              return (
                <Section
                  shops={data ? data["shops"] : sampleData["shops"]}
                  isFirst={key === 0}
                  name={category.name}
                  queries={queries}
                  key={key}
                />
              );
            })}
        <View style={{ marginTop: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
