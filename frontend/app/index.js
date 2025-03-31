import { Redirect, router } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        console.log("Token found, navigating to tabs");
        router.replace("/(tabs)");
      } else {
        console.log("No token found, navigating to login");
        router.replace("/(auth)/login");
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default index;
