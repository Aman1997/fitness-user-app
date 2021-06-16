import {combineReducers, createStore} from "redux";
import {fitnessProfilesReducer} from "./reducers/fitnessProfiles";
import {selectedProfileReducer} from "./reducers/selectedProfile";
import {userReducer} from "./reducers/userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  fitnessProfiles: fitnessProfilesReducer,
  selectedProfile: selectedProfileReducer,
});

export const store = createStore(rootReducer);
