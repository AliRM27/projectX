import * as Location from "expo-location";
import { useUserLocation } from "../context/UserLocationContext";

export const useRequestLocation = () => {
  const { setLocation } = useUserLocation();

  const requestAndSetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords); // { latitude, longitude }
  };

  return { requestAndSetLocation };
};
