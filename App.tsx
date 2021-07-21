import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import NoPartnerData from "./src/components/home/NoPartnerData";
import Amplify, {Auth} from "aws-amplify";
import awsconfig from "./aws-exports";
import setUserId from "./src/utils/setUserId";
import {useNetInfo} from "@react-native-community/netinfo";
import NoInternet from "./src/components/common/NoInternet";
import FitnessProfileScreen from "./src/screens/FitnessProfileScreen";
import ReviewsScreen from "./src/screens/ReviewsScreen";
import BookingCalendarScreen from "./src/screens/BookingCalendarScreen";
import {Provider} from "react-redux";
import {store} from "./src/redux/store";
import {sentryError, sentryInit} from "./src/utils/sentrySetup";
import urlOpener from "./src/utils/urlOpener";
import * as SplashScreen from "expo-splash-screen";

// configuring amplify
Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: awsconfig.oauth.redirectSignIn.split(",")[3],
    redirectSignOut: awsconfig.oauth.redirectSignOut.split(",")[2],
    urlOpener,
  },
});

// configuring sentry
sentryInit();

export default function App() {
  const [user, updateUser] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  //Check for internet connection
  const netInfo = useNetInfo();

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const authUser = await Auth.currentAuthenticatedUser();
        setUserId(authUser.attributes.email);
        updateUser(authUser);
      } catch (error) {
      } finally {
        setDataFetched(true);
        await SplashScreen.hideAsync();
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <NavigationContainer theme={{colors: {background: "#fff"}}}>
        {dataFetched ? (
          <View style={styles.container}>
            <StatusBar style="auto" />
            {netInfo.isInternetReachable ? (
              user ? (
                <AppNavigator />
              ) : (
                <AuthNavigator />
              )
            ) : (
              <NoInternet />
            )}
          </View>
        ) : (
          <View />
        )}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
