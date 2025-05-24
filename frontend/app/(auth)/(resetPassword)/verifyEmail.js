import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Back from "../../../assets/svgs/arrowleft.svg";
import { router } from "expo-router";
import OtpInput from "../../../components/OtpInput";
import { verifyOTP } from "../../../services/authApi";
import { useSearchParams } from "expo-router/build/hooks";
import { useLocalSearchParams } from "expo-router/build/hooks";

const verifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false); // Uncomment if you want to handle loading state
  const {email} = useLocalSearchParams();

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
      <Pressable onPress={() => router.back()} style={{}}>
        <Back />
      </Pressable>
      <View style={{ gap: 20 }}>
        <Text style={styles.heading}>VerifyEmail</Text>
        <Text style={{ color: "grey" }}>Code has been sent to your email.</Text>
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
          <Text style={styles.buttonText}>Verifying...</Text>
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
