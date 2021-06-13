import {IFitnessProfilesState} from "../reducers/fitnessProfiles";
import {IUserState} from "../reducers/userReducer";
import {FitnessProfilesAction, UserAction} from "./actionType";

export const addUser = (data: IUserState): UserAction => ({
  type: "ADD_USER",
  payload: data,
});

export const addFitnessProfiles = (
  data: IFitnessProfilesState,
): FitnessProfilesAction => ({
  type: "ADD_FITNESS_PROFILES",
  payload: data,
});
