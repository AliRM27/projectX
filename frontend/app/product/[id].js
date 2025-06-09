import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { fetchProduct, addToCart } from "../../services/api.js";
import { useQueryClient } from "@tanstack/react-query";
import BackArrow from "../../components/BackArrow.jsx";
import { useQuery } from "@tanstack/react-query";

const product = () => {
  const { id } = useLocalSearchParams();

  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    refetchInterval: false,
  });

  const add = async () => {};

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  const slideAnim = useRef(new Animated.Value(100)).current; // start 100px below

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200, // 1 second
      delay: 500, // delay before animation starts
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <BackArrow />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        style={{
          marginTop: 20,
          width: "100%",
          padding: 30,
        }}
        contentContainerStyle={{
          alignItems: "center",
          gap: 30,
          paddingBottom: 150,
        }}
      >
        <Image
          source={require("../../assets/examples/nikeShoe.png")}
          style={{
            width: 250,
            height: 150,
            borderRadius: 10,
          }}
        />
        <View style={{ gap: 30 }}>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 30 }}>{data.title}</Text>
            <Text style={{ fontSize: 15, color: "grey" }}>
              {data.description}
            </Text>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "grey",
              paddingVertical: 30,
            }}
          >
            <Text>Pick Up: {data.pickUpTime}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 17 }}>Price</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textDecorationLine: "line-through",
                  color: "grey",
                }}
              >
                {data.oldPrice}€
              </Text>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {data.newPrice}€
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 20, flexWrap: "wrap" }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 10,
                borderRadius: 10,
                gap: 10,
                flex: 1,
                alignItems: "center",
                minWidth: 80,
              }}
            >
              <Text style={{ fontSize: 17, color: "grey" }}>Sizes</Text>
              <View style={{ flexDirection: "row" }}>
                {data.bagDetails.sizes.map((size, key) => (
                  <Text
                    style={[
                      {
                        fontWeight: 500,
                        fontSize: 15,
                        padding: 10,
                      },
                      key !== 0
                        ? { borderLeftWidth: 1, borderColor: "grey" }
                        : {},
                    ]}
                    key={key}
                  >
                    {size}
                  </Text>
                ))}
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 10,
                borderRadius: 10,
                gap: 20,
                flex: 2,
                alignItems: "center",
                minWidth: 150,
              }}
            >
              <Text style={{ fontSize: 17, color: "grey" }}>Colors</Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {data.bagDetails.colorPalette.map((color, key) => (
                  <View
                    key={key}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: color,
                      borderWidth: 1,
                      borderColor: "grey",
                    }}
                  />
                ))}
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 10,
                borderRadius: 10,
                gap: 20,
                flex: 1,
                alignItems: "center",
                minWidth: 80,
              }}
            >
              <Text style={{ fontSize: 17, color: "grey" }}>Gender</Text>
              <Text style={{ fontWeight: "500", fontSize: 15 }}>
                {data.bagDetails.gender}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 10,
                borderRadius: 10,
                gap: 20,
                flex: 2,
                alignItems: "center",
                minWidth: 150,
              }}
            >
              <Text style={{ fontSize: 17, color: "grey" }}>Style</Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {data.bagDetails.style.map((style, key) => (
                  <Text
                    key={key}
                    style={{
                      fontSize: 15,
                    }}
                  >
                    {style};
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          backgroundColor: "white",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          padding: 20,
          paddingBottom: 0,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <TouchableOpacity
          onPress={add}
          style={{
            backgroundColor: "black",
            padding: 20,
            borderRadius: 10,
          }}
          activeOpacity={0.8}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 15 }}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default product;
