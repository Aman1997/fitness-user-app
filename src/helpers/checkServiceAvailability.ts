import {NavigationProp} from "@react-navigation/native";
import axios from "axios";
import Config from "react-native-config";
import {errorScreen} from "../navigation/routes";
import {sentryError} from "../utils/sentrySetup";
import {fetchJWT} from "./fetchJWT";

export const checkServiceAvailablibity = async (
  currentCity: string,
  navigation: NavigationProp<any>,
): Promise<boolean | undefined> => {
  try {
    
    // make an api call to verify if service exists
    const availableCities = await axios.get(
      Config.SERVICE_AVAILABILITY_CITIES_URL,
      {
        headers: await fetchJWT(),
      },
    );
    return availableCities.data.includes(currentCity) ? true : false;
  } catch (error) {
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};
