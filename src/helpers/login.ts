import {NavigationProp} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import {Dispatch} from "react";
import {Alert} from "react-native";
import {
  appHomeScreen,
  errorScreen,
  verifySignUpScreen,
} from "../navigation/routes";
import {sentryError} from "../utils/sentrySetup";
import setUserId from "../utils/setUserId";

export const login = async (
  email: string,
  password: string,
  setLoading: Dispatch<boolean>,
  navigation: NavigationProp<any>,
) => {
  setLoading(true);
  try {
    const signInRes = await Auth.signIn(email.toLowerCase(), password);

    // setting the user email in async storage
    await setUserId(signInRes.username);

    setLoading(false);

    return navigation.reset({
      index: 0,
      routes: [
        {
          name: appHomeScreen,
        },
      ],
    });
  } catch (error) {
    setLoading(false);
    if (error.code === "UserNotFoundException") {
      return Alert.alert(
        "Authentication failed",
        "The user email does not exists!",
        [{text: "OK"}],
      );
    }
    if (error.code === "NotAuthorizedException") {
      return Alert.alert(
        "Authentication failed",
        "The user email or password is incorrect!",
        [{text: "OK"}],
      );
    }
    if (error.code === "UserNotConfirmedException") {
      return Alert.alert(
        "User not verified",
        "Please continue to verify the user.",
        [
          {
            text: "Verify",
            onPress: async () => {
              setLoading(true);
              await Auth.resendSignUp(email);
              setLoading(false);
              navigation.navigate(verifySignUpScreen, {
                email,
              });
            },
          },
        ],
      );
    }
    sentryError(error);
    return navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};
