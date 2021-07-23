import {FitnessProfilesAction} from "../actions/actionType";

export interface IFitnessProfilesState {
  profiles: Array<{
    id: string;
    name: string;
    imageUrl: Array<string>;
    ratings: string;
    type: number;
    longitude: string;
    latitude: string;
    address: string;
    about: string;
    trainerImageUrl: string;
    tags: Array<string>;
    plans: Array<{
      id: string;
      type: number;
      batch: number;
      timeSlotTo: string;
      timeSlotFrom: string;
      price: string;
      days: Array<number>;
    }>;
  }>;
}

export const fitnessProfilesInitialState = {
  profiles: [
    {
      id: "",
      name: "",
      imageUrl: [],
      ratings: "",
      type: 0,
      longitude: "",
      latitude: "",
      address: "",
      about: "",
      trainerImageUrl: "",
      tags: [""],
      plans: [],
    },
  ],
};

export const fitnessProfilesReducer = (
  state: IFitnessProfilesState = fitnessProfilesInitialState,
  action: FitnessProfilesAction,
) => {
  switch (action.type) {
    case "ADD_FITNESS_PROFILES":
      return {
        profiles: action.payload.profiles,
      };
    default:
      return state;
  }
};
