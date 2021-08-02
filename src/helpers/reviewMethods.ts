import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
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
    console.log("Updated booking status");
  } catch (error) {
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

    console.log("Updated membership status");
  } catch (error) {
    sentryError(error);
  }
};

export const checkReviewStatus = async (
  isReviewed: boolean,
  bookingsId: string,
  membershipsId: string,
  setBookingReviewChecked: Dispatch<boolean>,
  setMembershipReviewChecked: Dispatch<boolean>,
) => {
  try {
    if (!isReviewed) {
      await updateBookingReview(bookingsId);
      setBookingReviewChecked(true);
    } else {
      await updateMembershipReview(membershipsId);
      setMembershipReviewChecked(true);
    }
  } catch (error) {
    sentryError(error);
  }
};
