import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import OtpInput from "../../../components/OtpInput";
import { verifyOTP } from "../../../services/authApi";
import { useLocalSearchParams } from "expo-router/build/hooks";
import BackArrow from "../../../components/BackArrow";

const verifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false); // Uncomment if you want to handle loading state
  const { email } = useLocalSearchParams();

  const handleOtpChange = async () => {
    try {
      setLoading(true);
      const response = await verifyOTP({ email, otp });
      console.log("OTP verification response:", response);
      router.push({ pathname: "/resetPassword", params: { email } });
    } catch (error) {
      console.error("Error in handleOtpChange:", error);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 40 }}>
      <BackArrow />
      <View style={{ gap: 20 }}>
        <Text style={styles.heading}>VerifyEmail</Text>
        <Text style={{ color: "grey", textAlign: "center" }}>
          Code has been sent to your email.
        </Text>
      </View>
      <OtpInput onOtpChange={setOtp} />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          handleOtpChange();
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text style={styles.buttonText}>Next</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default verifyEmail;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
    height: 60,
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" },
});
