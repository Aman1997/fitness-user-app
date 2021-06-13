import {IFitnessProfilesState} from "../reducers/fitnessProfiles";
import {IUserState} from "../reducers/userReducer";

export type UserAction = {
  type: "ADD_USER";
  payload: IUserState;
};

export type FitnessProfilesAction = {
  type: "ADD_FITNESS_PROFILES";
  payload: IFitnessProfilesState;
};
