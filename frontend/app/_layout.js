import { Stack } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { UserProvider } from "../context/favoriteContext";
// import GlobalDataLoader from "../components/GlobalLoader";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000), // Exponential backoff
      staleTime: 1000 * 60 * 1, // 1-minute cache (adjust if needed)
    },
  },
});

export default function _layout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle="dark-content" />
        <QueryClientProvider client={queryClient}>
          {/* <GlobalDataLoader /> */}
          <UserProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(auth)/register" />
              <Stack.Screen name="(auth)/login" />
              <Stack.Screen name="welcome" />
              <Stack.Screen name="product/[id]" />
            </Stack>
          </UserProvider>
        </QueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
