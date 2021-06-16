import {SelectedProfileAction} from "../actions/actionType";

export interface ISelectedProfileState {
  id?: string;
  name?: string;
  ratings?: number | undefined;
  address?: string;
  plan?: number;
  price?: number;
  imageUrl?: string;
  timeSlot?: string;
  date?: Date;
}

export const selectedProfileState = {
  id: "",
  name: "",
  ratings: undefined,
  address: "",
  plan: 0,
  price: 0,
  imageUrl: "",
  timeSlot: "",
  date: new Date(),
};

export const selectedProfileReducer = (
  state: ISelectedProfileState = selectedProfileState,
  action: SelectedProfileAction,
) => {
  switch (action.type) {
    case "ADD_SELECTED_PROFILE":
      return {
        id: action.payload.id,
        name: action.payload.name,
        ratings: action.payload.ratings,
        address: action.payload.address,
        plan: action.payload.plan,
        price: action.payload.price,
        imageUrl: action.payload.imageUrl,
        date: action.payload.date,
        timeSlot: action.payload.timeSlot,
      };
    default:
      return state;
  }
};
