import React from "react";
import {StyleSheet, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import AuthNavigator from "./src/navigation/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer theme={{colors: {background: "#fff"}}}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <AuthNavigator />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
