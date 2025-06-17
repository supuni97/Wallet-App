import { Stack } from "expo-router/stack";
import { Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "../../constants/colors"; // or just hardcode a color

export default function Layout() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    // Show loading screen while checking auth
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary || "#000"} />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
