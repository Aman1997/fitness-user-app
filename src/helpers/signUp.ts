import {NavigationProp} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import {Dispatch} from "react";
import {Alert} from "react-native";
import {errorScreen, verifySignUpScreen} from "../navigation/routes";
import {sentryError} from "../utils/sentrySetup";

export const signUp = async (
  email: string,
  password: string,
  name: string,
  phoneNumber: string,
  setLoading: Dispatch<boolean>,
  navigation: NavigationProp<any>,
) => {
  setLoading(true);
  try {
    const signUpRes = await Auth.signUp({
      username: email.toLowerCase(),
      password: password,
      attributes: {
        "custom:name": name,
        "custom:phoneNumber": phoneNumber,
      },
    });
    setLoading(false);
    navigation.navigate(verifySignUpScreen, {
      email,
      password,
    });
  } catch (error) {
    setLoading(false);
    // Checking if user exist
    if (error.code === "UsernameExistsException") {
      Alert.alert("Sign Up Error", error.message, [{text: "Try Again"}], {
        cancelable: false,
      });
    } else {
      sentryError(error);
      navigation.reset({index: 0, routes: [{name: errorScreen}]});
    }
  }
};
