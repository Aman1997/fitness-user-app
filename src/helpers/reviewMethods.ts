import {API, graphqlOperation} from "aws-amplify";
import {
  CREATE_REVIEWS,
  UPDATE_USER_BOOKING_REVIEW_STATUS,
  UPDATE_USER_MEMBERSHIP_REVIEW_STATUS,
} from "../queries/mutation";
import {sentryError} from "../utils/sentrySetup";

export const createReview = async (
  fitnessServiceId: string,
  ratings: Number,
  review: string,
  userEmail: string,
) => {
  try {
    await API.graphql(
      graphqlOperation(CREATE_REVIEWS, {
        fitnessServiceId,
        ratings,
        review,
        userEmail,
      }),
    );
  } catch (error) {
    sentryError(error);
  }
};

export const updateBookingReview = async (id: string) => {
  try {
    await API.graphql(
      graphqlOperation(UPDATE_USER_BOOKING_REVIEW_STATUS, {
        id,
      }),
    );
    console.log(`Updated booking review status for ${id}`);
  } catch (error) {
    console.log(error);
    sentryError(error);
  }
};

export const updateMembershipReview = async (id: string) => {
  try {
    await API.graphql(
      graphqlOperation(UPDATE_USER_MEMBERSHIP_REVIEW_STATUS, {
        id,
      }),
    );
    console.log(`Updated membership review status for ${id}`);
  } catch (error) {
    sentryError(error);
  }
};
