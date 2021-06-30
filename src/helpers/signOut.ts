import {NavigationProp} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import {errorScreen, postLogoutScreen} from "../navigation/routes";
import removeUserId from "../utils/removeUserId";
import {sentryError} from "../utils/sentrySetup";

export const signOut = async (navigation: NavigationProp<any>) => {
  try {
    await Auth.signOut();
    await removeUserId();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: postLogoutScreen,
        },
      ],
    });
  } catch (error) {
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};
