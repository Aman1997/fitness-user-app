import {NavigationProp} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import {Dispatch} from "react";
import {Alert} from "react-native";
import {appHomeScreen, errorScreen} from "../navigation/routes";
import {sentryError} from "../utils/sentrySetup";
import setUserId from "../utils/setUserId";

export const verifyOTP = async (
  email: string,
  otp: string,
  password: string,
  setLoading: Dispatch<boolean>,
  navigation: NavigationProp<any>,
) => {
  setLoading(true);
  try {
    await Auth.confirmSignUp(email, otp);

    const signInRes = await Auth.signIn(email.toLowerCase(), password);

    // setting the user email in async storage
    setUserId(signInRes.username);

    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: appHomeScreen,
        },
      ],
    });
  } catch (error) {
    setLoading(false);
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};

export const resendConfirmation = async (
  email: string,
  setLoading: Dispatch<any>,
  navigation: NavigationProp<any>,
) => {
  try {
    await Auth.resendSignUp(email);
    setLoading(false);
    Alert.alert("The otp has been re sent!");
  } catch (error) {
    setLoading(false);
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};
