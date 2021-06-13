import {FitnessProfilesAction} from "../actions/actionType";

export interface IFitnessProfilesState {
  profiles: Array<{
    id: string;
    name: string;
    imageUrl: Array<string>;
    ratings: number;
    type: number;
    longitude: string;
    latitude: string;
    address: string;
    about: string;
    trainerImageUrl: string;
    tags: Array<string>;
    plans: Array<{
      id: string;
      price: string;
      type: number;
    }>;
    availableSlots: Array<{
      day: number;
      timeSlots: Array<string>;
    }>;
  }>;
}

export const fitnessProfilesInitialState = {
  profiles: [
    {
      id: "",
      name: "",
      imageUrl: [],
      ratings: 0,
      type: 0,
      longitude: "",
      latitude: "",
      address: "",
      about: "",
      trainerImageUrl: "",
      tags: [""],
      plans: [
        {
          id: "",
          price: "",
          type: 0,
        },
      ],
      availableSlots: [
        {
          day: 0,
          timeSlots: [],
        },
      ],
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
