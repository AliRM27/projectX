import { Stack } from "expo-router";
import { View } from "react-native";
// import { AuthProvider } from "./context/AuthContext";
// import { CartProvider } from "./context/CartContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
