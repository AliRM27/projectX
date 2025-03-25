import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { registerUser } from "../../services/authApi.js"; // Import API function
import { Link, router } from "expo-router";

const RegisterScreen = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password) {
      setError("All fields are required");
      setIsError(true);
      return;
    }

    setLoading(true);
    try {
      await registerUser(form);
      setIsError(false);
      router.replace("login");
    } catch (error) {
      setError(error);
      setIsError(true);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.fullName}
        onChangeText={(text) => handleChange("fullName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
      />

      {isError && <Text style={{ color: "red" }}>{error}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity>
        <Link href="/login" style={{ textAlign: "center", marginTop: 20 }}>
          Already have an account? Login
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default RegisterScreen;
