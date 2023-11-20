import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import ScanScreen from "./screens/ScanScreen";
import ScanHistoryScreen from "./screens/ScanHistoryScreen";
import SettingScreen from "./screens/SettingScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BarcodeScannerHome() {
  return <BottomTabs.Navigator
    screenOptions={{
      headerTitleAlign: "center",
    }}
  >
    <BottomTabs.Screen
      name="ScanScreen"
      component={ScanScreen}
      options={{
        headerShown: false,
        tabBarLabel: "Scan",
        tabBarIcon: ({ color, size }) => <Ionicons name="md-scan-outline" size={size} color={color} />,
      }}
    />
    <BottomTabs.Screen
      name="HistoryScreen"
      component={ScanHistoryScreen}
      options={{
        title: "Scan history",
        tabBarLabel: "History",
        tabBarIcon: ({ color, size }) => <Ionicons name="md-time-outline" size={size} color={color} />,
      }}
    />
    <BottomTabs.Screen
      name="SettingScreen"
      component={SettingScreen}
      options={{
        title: "Settings",
        tabBarLabel: "Settings",
        tabBarIcon: ({ color, size }) => <Ionicons name="md-settings-outline" size={size} color={color} />,
      }}
    />
  </BottomTabs.Navigator>;
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
          "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <View style={styles.rootContainer} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="BarcodeScanner"
              component={BarcodeScannerHome}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
