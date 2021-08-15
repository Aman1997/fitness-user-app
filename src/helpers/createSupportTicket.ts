import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { Dispatch } from "react";
import { Alert } from "react-native";
import Config from "react-native-config";
import { errorScreen } from "../navigation/routes";
import { IUserState } from "../redux/reducers/userReducer";
import { sentryError } from "../utils/sentrySetup";
import { fetchJWT } from "./fetchJWT";

export const createTicket = async (setLoading: Dispatch<boolean>, query: string, user: IUserState, setQuery: Dispatch<string>, setSubmitted: Dispatch<boolean>, navigation: NavigationProp<any> ) => {
    // Checking if query is not empty
    if (query === "") return Alert.alert("Please enter your query.");

    setLoading(true);
    try {
      const params = {
        email: user.email,
        name: user.name,
        type: "general",
        query: query,
      };

      const { data } = await axios.post(Config.SUPPORT_TICKET_URL, params, {
        headers: await fetchJWT(),
      });

      if (data.status === "Success") {
        setLoading(false);
        setQuery("");
        setSubmitted(true);
      }
    } catch (error) {
      setLoading(false);
      sentryError(`Some error occured while submitting your query: ${error}`);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: errorScreen,
          },
        ],
      });
    }
  };