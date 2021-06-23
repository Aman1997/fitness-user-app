import {UserAction} from "../actions/actionType";

export interface IUserState {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  phoneNumber: string;
  currentLat: number;
  currentLong: number;
}

const initialState = {
  id: "",
  email: "",
  name: "",
  imageUrl: "",
  phoneNumber: "",
  currentLat: 0,
  currentLong: 0,
};

export const userReducer = (
  state: IUserState = initialState,
  action: UserAction,
) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        imageUrl: action.payload.imageUrl,
        phoneNumber: action.payload.phoneNumber,
        currentLat: action.payload.currentLat,
        currentLong: action.payload.currentLong,
      };
    default:
      return state;
  }
};
