import {BookingsAction} from "../actions/actionType";

export interface IBookingState {
  bookings: Array<{
    id: string;
    bookingDate: string;
    status: string;
    pin: number;
    timeSlot: string;
    fitnessService?: {
      id?: string;
      longitude?: string;
      latitude?: string;
      name?: string;
      imageUrl?: string;
      trainerName?: string;
      trainerImageUrl?: string;
    };
  }>;
}

export const bookingInitialState = {
  bookings: [
    {
      id: "",
      bookingDate: "",
      status: "",
      pin: 0,
      timeSlot: "",
      fitnessService: {
        id: "",
        longitude: "",
        latitude: "",
        name: "",
        imageUrl: "",
        trainerName: "",
        trainerImageUrl: "",
      },
    },
  ],
};

export const bookingsReducer = (
  state: IBookingState = bookingInitialState,
  action: BookingsAction,
) => {
  switch (action.type) {
    case "ADD_BOOKINGS":
      return {
        bookings: action.payload.bookings,
      };
    default:
      return state;
  }
};
