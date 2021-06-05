import React from "react";
import {enableScreens} from "react-native-screens";
import {createNativeStackNavigator, NativeStackNavigationOptions} from "react-native-screens/native-stack";
import GetStartedScreen from "../screens/GetStartedScreen";
import {
  forgotPasswordScreen,
  getStartedScreen,
  signInScreen,
  signUpScreen,
  verifySignUpScreen,
} from "./routes";
import {HEAD_TEXT} from "../assets/constants/colors";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPaswordScreen from "../screens/ForgotPaswordScreen";
import VerifySignUpScreen from "../screens/VerifySignUpScreen";

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

const modalStyle: NativeStackNavigationOptions = {stackPresentation: "modal", headerShown: false};

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={getStartedScreen}>
    <Stack.Screen
      name={getStartedScreen}
      component={GetStartedScreen}
      options={modalStyle}
    />
    <Stack.Screen
      name={signInScreen}
      component={SignInScreen}
      options={modalStyle}
    />
    <Stack.Screen
      name={signUpScreen}
      component={SignUpScreen}
      options={modalStyle}
    />
    <Stack.Screen
      name={forgotPasswordScreen}
      component={ForgotPaswordScreen}
      options={modalStyle}
    />
        <Stack.Screen
      name={verifySignUpScreen}
      component={VerifySignUpScreen}
      options={modalStyle}
    />
    {/* <Stack.Screen
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
      /> */}

    {/* Error handling screen */}
    {/* <Stack.Screen
      name="ErrorScreen"
      component={AppFallbackErrorComponent}
      options={noHeader}
    />
    <Stack.Screen name="Home" component={AppNavigation} options={noHeader} />  */}
  </Stack.Navigator>
);

export default AuthNavigator;
