import {StackNavigationProp} from "@react-navigation/stack";
import {Auth} from "aws-amplify";
import {Alert} from "react-native";
import {errorScreen, signInScreen} from "../navigation/routes";
import { sentryError } from "../utils/sentrySetup";

export const createNewPassword = async (
  email: string,
  code: string,
  newPassword: string,
  navigation: StackNavigationProp<any>,
) => {
  try {
    await Auth.forgotPasswordSubmit(email, code, newPassword);
    Alert.alert("Password has been successfully changed");
    navigation.replace(signInScreen);
  } catch (error) {
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};
