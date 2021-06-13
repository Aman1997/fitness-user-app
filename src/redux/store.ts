import { combineReducers, createStore } from "redux";
import { fitnessProfilesReducer } from "./reducers/fitnessProfiles";
import { userReducer } from "./reducers/userReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    fitnessProfiles: fitnessProfilesReducer
})

export const store = createStore(rootReducer)