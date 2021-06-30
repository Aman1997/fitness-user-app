import {NavigationProp} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import {Dispatch} from "react";
import {Alert} from "react-native";
import {errorScreen} from "../navigation/routes";
import {sentryError} from "../utils/sentrySetup";

export const createOTP = async (
  email: string,
  setCodeGeneration: Dispatch<boolean>,
  setEmail: Dispatch<string>,
  navigation: NavigationProp<any>,
) => {
  try {
    await Auth.forgotPassword(email.toLowerCase());
    Alert.alert("OPT has been generated and sent to your mail!");
    setCodeGeneration(false);
    setEmail(email.toLowerCase());
  } catch (error) {
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};
