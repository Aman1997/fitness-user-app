import {NavigationProp} from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import {errorScreen} from "../navigation/routes";
import {SEARCH_FITNESS_PARTNER_BY_NAME} from "../queries/query";
import {IUserState} from "../redux/reducers/userReducer";
import {sentryError} from "../utils/sentrySetup";

export const search = async (
  query: string,
  user: IUserState,
  setSearchResults: Dispatch<any>,
  navigation: NavigationProp<any>,
  setLoading: Dispatch<boolean>,
  setTyping: Dispatch<boolean>,
) => {
  try {
    setLoading(true);
    if (query && user) {
      const searchRes = await API.graphql(
        graphqlOperation(SEARCH_FITNESS_PARTNER_BY_NAME, {
          name: query,
        }),
      );
      // @ts-ignore
      const requiredData = searchRes.data.listFitnessServices.items;

      setSearchResults(
        // @ts-ignore
        requiredData.map((item) => ({
          ...item,
          plans: item.plans?.items,
          availableSlots: item.availableSlots?.items,
        })),
      );
    }
    setTyping(false);
    setLoading(false);
  } catch (error) {
    setTyping(false);
    setLoading(false);
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};
