import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";

const OtpInput = ({ onOtpChange }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (!/^\d?$/.test(text)) return; // Only allow single digits

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onOtpChange(newOtp.join(""));

    // Move to next input
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          style={styles.input}
          onFocus={() => inputs.current[index].setNativeProps({ style: { borderColor: "black" } })}
          onBlur={() => inputs.current[index].setNativeProps({ style: { borderColor: "rgb(208, 208, 208)" } })}
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          caretHidden={true} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  input: {
    width: Dimensions.get("screen").width / 6, // Adjust width based on screen size
    height: 60,
    borderWidth: 1,
    borderColor: "rgb(208, 208, 208)",
    borderRadius: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
});

export default OtpInput;
