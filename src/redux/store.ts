import {combineReducers, createStore} from "redux";
import {bookingsReducer} from "./reducers/bookingsReducer";
import {fitnessProfilesReducer} from "./reducers/fitnessProfiles";
import {selectedProfileReducer} from "./reducers/selectedProfile";
import {userReducer} from "./reducers/userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  fitnessProfiles: fitnessProfilesReducer,
  selectedProfile: selectedProfileReducer,
  bookings: bookingsReducer,
});

export const store = createStore(rootReducer);
