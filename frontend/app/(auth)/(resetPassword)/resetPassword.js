import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Back from "../../../assets/svgs/arrowleft.svg";
import { resetUserPassword } from "../../../services/authApi";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const resetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { email } = useLocalSearchParams();

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setNewPassword("");
      setConfirmPassword("");
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await resetUserPassword({ email, newPassword });
      if (response.status === 200) {
        alert("Password reset successfully!");
        router.navigate("login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={{}}>
        <Back />
      </Pressable>
      <View style={{ gap: 20 }}>
        <Text style={styles.heading}>Reset Your Password</Text>
        <Text style={{ color: "grey" }}>Enter your new password below.</Text>
      </View>
      <View style={{ gap: 20 }}>
        <TextInput
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => handlePasswordChange()}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default resetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 55,
    width: "100%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
    height: 60,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
