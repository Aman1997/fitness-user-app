import {SelectedProfileAction} from "../actions/actionType";

export interface ISelectedProfileState {
  id?: string;
  name?: string;
  ratings?: number | undefined;
  address?: string;
  plan?: number;
  batch?: number;
  price?: string;
  imageUrl?: string;
  timeSlot?: string;
  date?: Date;
  isMembershipRenew?: boolean
}

export const selectedProfileState = {
  id: "",
  name: "",
  ratings: undefined,
  address: "",
  plan: 0,
  price: "",
  imageUrl: "",
  batch: 0,
  timeSlot: "",
  date: new Date(),
  isMembershipRenew: false
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
        batch: action.payload.batch,
        date: action.payload.date,
        timeSlot: action.payload.timeSlot,
        isMembershipRenew: action.payload.isMembershipRenew
      };
    default:
      return state;
  }
};
