import { NavigationProp } from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import { errorScreen } from "../navigation/routes";
import {LIST_FITNESS_PARTNERS} from "../queries/query";
import {addFitnessProfiles} from "../redux/actions/actionCreator";
import {FitnessProfilesAction} from "../redux/actions/actionType";
import {fitnessProfilesInitialState} from "../redux/reducers/fitnessProfiles";
import { sentryError } from "../utils/sentrySetup";

export const fetchData = async (
  type: number,
  city: string,
  dispatch: Dispatch<FitnessProfilesAction>,
  setNextToken: (nextToken: string) => void,
  nextToken: string | null,
  setLoading: Dispatch<boolean>,
  navigation: NavigationProp<any>
) => {
  try {
    const dataRes = await API.graphql(
      graphqlOperation(LIST_FITNESS_PARTNERS, {
        type,
        city,
        nextToken,
      }),
    );
    // @ts-ignore
    const requiredData = dataRes.data.listFitnessServices.items;

    if (requiredData.length !== 0) {
      dispatch(
        addFitnessProfiles({
          // @ts-ignore
          profiles: requiredData.map((item) => ({
            ...item,
            plans: item.plans?.items,
          })),
        }),
      );
      // @ts-ignore
      setNextToken(dataRes.data.listFitnessServices.nextToken);
    } else {
      dispatch(addFitnessProfiles(fitnessProfilesInitialState));
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};
