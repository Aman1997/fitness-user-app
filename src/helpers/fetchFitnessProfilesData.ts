import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import {LIST_FITNESS_PARTNERS} from "../queries/query";
import {addFitnessProfiles, addUser} from "../redux/actions/actionCreator";
import {FitnessProfilesAction} from "../redux/actions/actionType";
import {fitnessProfilesInitialState} from "../redux/reducers/fitnessProfiles";

export const fetchData = async (
  type: number,
  city: string,
  dispatch: Dispatch<FitnessProfilesAction>,
  setNextToken: (nextToken: string) => void,
  nextToken: string | null,
  setLoading: Dispatch<boolean>,
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
            availableSlots: item.availableSlots?.items,
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
    console.log("Some error occured", error);
  }
};
