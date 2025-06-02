import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { api } from "./api.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Platform } from "react-native";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

// Replace these with your Google OAuth credentials
const GOOGLE_CLIENT_ID = Platform.select({
  android:
    "868420889172-fp3dl9di53a18vl1pm7rg1lcpeaoj5f8.apps.googleusercontent.com", // Replace with your Android client ID
  default:
    "868420889172-fp3dl9di53a18vl1pm7rg1lcpeaoj5f8.apps.googleusercontent.com",
});

// Get the appropriate redirect URI based on platform
const getRedirectUri = () => {
  if (Platform.OS === "android") {
    return AuthSession.makeRedirectUri({
      native: "com.lotuz.frontend://oauth2redirect",
      useProxy: false,
    });
  }
  return AuthSession.makeRedirectUri({
    native: "frontend://redirect",
  });
};

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    scopes: ["profile", "email"],
    redirectUri: getRedirectUri(),
    discovery,
    useProxy: Platform.OS === "android" ? false : true,
  });

  const handleGoogleSignIn = async (setUser) => {
    try {
      console.log(
        "Starting Google Sign In with redirect URI:",
        getRedirectUri()
      );
      const result = await promptAsync();
      console.log(
        "Full Google Sign In Result:",
        JSON.stringify(result, null, 2)
      );

      if (result?.type === "success") {
        // Log the entire authentication object
        console.log(
          "Authentication object:",
          JSON.stringify(result.authentication, null, 2)
        );
        console.log("Params object:", JSON.stringify(result.params, null, 2));

        // Try to get the access token from different possible locations
        const access_token =
          result.authentication?.accessToken ||
          result.authentication?.access_token ||
          result.params?.access_token;

        if (!access_token) {
          console.error(
            "No access token found in response. Full result:",
            result
          );
          return {
            success: false,
            error: "No access token received from Google",
          };
        }

        console.log(
          "Successfully got access token:",
          access_token.substring(0, 10) + "..."
        );
        console.log("Sending token to backend...");

        // Send the token to your backend
        const response = await api.post("auth/google", {
          token: access_token,
        });

        console.log("Backend response:", response.data);
        const { accessToken, refreshToken, user } = response.data;

        // Store tokens
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);

        // Update user context
        setUser(user);

        // Navigate to home page
        router.replace("../(tabs)");

        return { success: true, user };
      }

      return {
        success: false,
        error: "Google sign in was cancelled or failed",
      };
    } catch (error) {
      console.error("Google Sign In Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        redirectUri: getRedirectUri(), // Log the redirect URI in case of error
      });
      return { success: false, error: error.message };
    }
  };

  return {
    handleGoogleSignIn,
    isGoogleSignInReady: !!request,
  };
};
