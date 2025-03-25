import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchUser } from "../../services/api.js";

export default function profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadData();
  }, []);

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
        </View>
      )}
    </View>
  );
}
