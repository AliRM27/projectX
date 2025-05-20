import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

const index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        console.log("Token found, navigating to tabs");
        router.replace("/(tabs)");
        SplashScreen.hideAsync();
      } else if (!hasLaunched) {
        console.log("First Time here");
        router.replace("/welcome");
        SplashScreen.hideAsync();
      } else {
        console.log("No token found, navigating to login");
        router.replace("/(auth)/login");
        SplashScreen.hideAsync();
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
