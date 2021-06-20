import {API, graphqlOperation} from "aws-amplify";
import {Dispatch, SetStateAction} from "react";
import {CURRENT_USER_BOOKINGS} from "../queries/query";
import {addBookingsData} from "../redux/actions/actionCreator";
import {IMembershipData} from "../types/stateTypes";

export const fetchBookings = async (
  email: string,
  dispatch: Dispatch<any>,
  setMembershipData: Dispatch<
    SetStateAction<Array<IMembershipData> | undefined>
  >,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const bookingsRes = await API.graphql(
      graphqlOperation(CURRENT_USER_BOOKINGS, {email}),
    );
    // @ts-ignore
    const requiredBookingsData = bookingsRes.data.getUser.bookings.items;
    // @ts-ignore
    const requiredMembershipsData = bookingsRes.data.getUser.memberships.items;

    // setting the booking data
    dispatch(
      addBookingsData({
        // @ts-ignore
        bookings: requiredBookingsData.map((item) => ({
          id: item.id,
          bookingDate: item.bookingDate,
          status: item.status,
          pin: item.pin,
          timeSlot: item.timeSlot,
          fitnessService: {
            id: item.fitnessService.id,
            longitude: item.fitnessService.longitude,
            latitude: item.fitnessService.latitude,
            name: item.fitnessService.name,
            imageUrl: item.fitnessService.imageUrl[0],
            trainerName: item.fitnessService.trainerName,
            trainerImageUrl: item.fitnessService.trainerImageUrl,
          },
        })),
      }),
    );

    // setting the memberships data
    setMembershipData(
      // @ts-ignore
      requiredMembershipsData.map((item) => ({
        id: item.id,
        to: item.to,
        from: item.from,
        ratings: item.ratings,
        fitnessService: {
          id: item.fitnessService.id,
          name: item.fitnessService.name,
          imageUrl: item.fitnessService.imageUrl[0],
          plans: item.fitnessService.plans.items,
          address: item.fitnessService.address,
        },
      })),
    );

    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log("Some error occured while fetching bookings", error);
  }
};
