import axios from "axios";
import Config from "react-native-config";
import {fetchJWT} from "./fetchJWT";

export const fetchAvailableCities = async () => {
  const availableCities = await axios.get(
    Config.SERVICE_AVAILABILITY_CITIES_URL,
    {
      headers: await fetchJWT(),
    },
  );
  return availableCities.data;
};
