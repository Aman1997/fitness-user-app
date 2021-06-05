import React from "react";
import {enableScreens} from "react-native-screens";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import GetStartedScreen from "../screens/GetStartedScreen";
import {getStartedScreen} from "./routes";
import {HEAD_TEXT} from "../assets/colors";

enableScreens();
const Stack = createNativeStackNavigator();

const noHeader = {headerShown: false};

const noTitle = {
  headerTitle: "",
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerBackTitle: "Back",
  headerBackAllowFontScaling: true,
  headerTintColor: HEAD_TEXT,
};

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={getStartedScreen}>
    <Stack.Screen
      name={getStartedScreen}
      component={GetStartedScreen}
      options={noHeader}
    />
    {/* <Stack.Screen
        name="AuthOptionsScreen"
        component={AuthOptionsScreen}
        options={noHeader}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={noTitle}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={noHeader}
      />
      <Stack.Screen
        name="CreateNewPasswordScreen"
        component={CreateNewPasswordScreen}
        options={noHeader}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={noTitle}
      />
      <Stack.Screen
        name="VerifySignupScreen"
        component={VerifySignup}
        options={noHeader}
      />
  
      {/* Error handling screen */}
    {/* <Stack.Screen
      name="ErrorScreen"
      component={AppFallbackErrorComponent}
      options={noHeader}
    />
    <Stack.Screen name="Home" component={AppNavigation} options={noHeader} /> */}
  </Stack.Navigator>
);

export default AuthNavigator;
