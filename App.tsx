import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import Amplify, {Auth} from "aws-amplify";
import awsconfig from "./aws-exports";
import setUserId from "./src/utils/setUserId";
import {useNetInfo} from "@react-native-community/netinfo";
import NoInternet from "./src/components/common/NoInternet";
import {Provider} from "react-redux";
import {store} from "./src/redux/store";
import {sentryInit} from "./src/utils/sentrySetup";
import urlOpener from "./src/utils/urlOpener";
import * as SplashScreen from "expo-splash-screen";
import {setJSExceptionHandler} from "react-native-exception-handler";
import {uncaughtExceptionHandler} from "./src/utils/uncaughtExceptionHandler";
import messaging from "@react-native-firebase/messaging";


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

// catching uncaught errors
setJSExceptionHandler(uncaughtExceptionHandler);

export default function App() {
  const [user, updateUser] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState(false);

  //Check for internet connection
  const netInfo = useNetInfo();

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const authUser = await Auth.currentAuthenticatedUser();
        await setUserId(authUser.attributes.email);
        updateUser(authUser.attributes.email);
      } catch (error) {
      } finally {
        setDataFetched(true);
        await SplashScreen.hideAsync();
      }
    })();
  }, []);

  // push notification permissions
  useEffect(() => {
    messaging().requestPermission();
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
