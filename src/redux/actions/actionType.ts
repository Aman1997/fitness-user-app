import {IFitnessProfilesState} from "../reducers/fitnessProfiles";
import {ISelectedProfileState} from "../reducers/selectedProfile";
import {IUserState} from "../reducers/userReducer";

export type UserAction = {
  type: "ADD_USER";
  payload: IUserState;
};

export type FitnessProfilesAction = {
  type: "ADD_FITNESS_PROFILES";
  payload: IFitnessProfilesState;
};

export type SelectedProfileAction = {
  type: "ADD_SELECTED_PROFILE";
  payload: ISelectedProfileState;
};
