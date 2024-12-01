import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import SignUp from "./signup";
import Index from "./index";

// App Screens
import HomeScreen from "./(tabs)";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        setUserToken(token);
      } catch (error) {
        console.error("Error reading token", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (loaded) {
      SplashScreen.hideAsync();
    }

    checkToken();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const AuthStack = createStackNavigator();

  const AuthStackScreen = () => {
    <AuthStack.Navigator>
      <AuthStack.Screen name="LogIn" component={Index} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>;
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="encryption" options={{ headerShown: false }} />
        <Stack.Screen name="decryption" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
