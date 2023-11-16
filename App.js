import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";

import ScanScreen from "./screens/ScanScreen";
import ScanHistoryScreen from "./screens/ScanHistoryScreen";
import SettingScreen from "./screens/SettingScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BarcodeScannerHome() {
  return (
    <BottomTabs.Navigator
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="HistoryScreen"
        component={ScanHistoryScreen}
        options={{
          title: "Scan history",
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="refresh" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({});
