import {StackNavigationProp} from "@react-navigation/stack";
import {API, graphqlOperation} from "aws-amplify";
import {Dispatch, SetStateAction} from "react";
import {Alert} from "react-native";
import {CANCEL_BOOKING} from "../queries/mutation";
import {addBookingsData} from "../redux/actions/actionCreator";
import {IBookingState} from "../redux/reducers/bookingsReducer";

export const cancelBooking = async (
  id: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  navigation: StackNavigationProp<any>,
  dispatch: Dispatch<any>,
  bookings: IBookingState["bookings"],
) => {
  try {
    await API.graphql(graphqlOperation(CANCEL_BOOKING, {id}));
    Alert.alert(
      "Booking Cancelled",
      `Your booking with reference no: ${id} has been cancelled`,
      [
        {
          text: "Ok",
          onPress: () => navigation.pop(),
        },
      ],
      {
        cancelable: false,
      },
    );

    dispatch(
      addBookingsData({
        bookings: bookings.map((item) =>
          item.id === id ? {...item, status: "cancelled"} : item,
        ),
      }),
    );

    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log("Some error occured while cancelling session", error);
  }
};
