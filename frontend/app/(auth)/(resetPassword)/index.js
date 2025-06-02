import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { requestReset } from "../../../services/authApi";
import BackArrow from "../../../components/BackArrow";

const getEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async () => {
    try {
      setLoading(true);
      const res = await requestReset(email);
      if (!res.success) {
        throw new Error(res.message || "Failed to request password reset");
      }
      router.push({ pathname: "/verifyEmail", params: { email } });
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <BackArrow />
      <Text style={styles.heading}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TouchableOpacity
        onPress={() => handleRequestReset()}
        style={styles.button}
        activeOpacity={0.7}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Next</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default getEmail;

const styles = StyleSheet.create({
  heading: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 55,
    width: "100%",
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
    height: 60,
    justifyContent: "center",
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" },
});
