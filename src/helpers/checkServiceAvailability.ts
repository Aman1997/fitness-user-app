import axios from "axios";
import Config from "react-native-config";
import {fetchJWT} from "./fetchJWT";

export const checkServiceAvailablibity = async (
  currentCity: string,
): Promise<boolean> => {
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
    console.log(
      "Some error occured while fetching available cities data",
      error,
    );
    return false;
  }
};
