import {IFitnessProfilesState} from "../reducers/fitnessProfiles";
import {ISelectedProfileState} from "../reducers/selectedProfile";
import {IUserState} from "../reducers/userReducer";
import {
  FitnessProfilesAction,
  SelectedProfileAction,
  UserAction,
} from "./actionType";

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

export const addSelectedProfile = (
  data: ISelectedProfileState,
): SelectedProfileAction => ({
  type: "ADD_SELECTED_PROFILE",
  payload: data,
});
