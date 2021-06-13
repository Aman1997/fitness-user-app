import { UserAction } from "../actions/actionType";

export interface IUserState {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  phoneNumber: string
}

const initialState = {
  id: "",
  email: "",
  name: "",
  imageUrl: "",
  phoneNumber: ""
};

export const userReducer = (state: IUserState = initialState, action: UserAction) => {
    switch(action.type) {
        case 'ADD_USER':
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                imageUrl: action.payload.imageUrl,
                phoneNumber: action.payload.phoneNumber
            }
        default: 
            return state    
    }
};
