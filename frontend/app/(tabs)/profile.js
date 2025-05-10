import { View, Text, ActivityIndicator, Button } from "react-native";
import React, { useState, useCallback } from "react";
import { fetchUser } from "../../services/api.js";
import { useFocusEffect } from "expo-router";
import { logoutUser } from "../../services/authApi.js";
import { useUser } from "../../context/userContext.js";

export default function profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setUser: setUserContext } = useUser();

  const logOut = async () => {
    try {
      await logoutUser(setUserContext);
    } catch (error) {
      console.error("Failed to logout");
    }
  };

  const loadData = async () => {
    try {
      const result = await fetchUser();
      setUser(result);
    } catch (error) {
      console.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <View>
          <Text>{user.fullName}</Text>
          <Text>{user.email}</Text>
          <Button title="Logout" onPress={logOut} />
        </View>
      )}
    </View>
  );
}
