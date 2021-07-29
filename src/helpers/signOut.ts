import {NavigationProp} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import {errorScreen, postLogoutScreen} from "../navigation/routes";
import removeUserId from "../utils/removeUserId";
import {sentryError} from "../utils/sentrySetup";
import messaging from "@react-native-firebase/messaging";
import axios from "axios";
import Config from "react-native-config";
import {fetchJWT} from "./fetchJWT";

export const signOut = async (
  email: string,
  navigation: NavigationProp<any>,
) => {
  try {
    await axios.post(
      `${Config.NOTIFICATION_API}/deleteToken`,
      {email},
      {headers: await fetchJWT()},
    );
    await Auth.signOut();
    await removeUserId();
    await messaging().deleteToken();
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
