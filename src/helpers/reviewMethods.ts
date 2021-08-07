import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import {
  CREATE_REVIEWS,
  UPDATE_USER_BOOKING_REVIEW_STATUS,
  UPDATE_USER_MEMBERSHIP_REVIEW_STATUS,
} from "../queries/mutation";
import {LOG_TYPE, NotificationType} from "../utils/constants";
import {sentryError} from "../utils/sentrySetup";
import {sendNotification} from "./pushNotificationMethods";

export const createReview = async (
  fitnessServiceId: string,
  ratings: Number,
  review: string,
  userEmail: string,
  userName: string,
  bookingId: string,
  partnerEmail: string,
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

    // send the notification
    await sendNotification(
      NotificationType.REVIEW_ADDED,
      partnerEmail,
      userName,
      new Date().toISOString(),
      0,
      LOG_TYPE.review_added,
      {
        email: userEmail,
        userName,
        bookingId,
      },
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
  setIsReviewChecked: Dispatch<boolean>,
) => {
  try {
    if (!isReviewed) {
      await updateBookingReview(bookingsId);
    } else {
      await updateMembershipReview(membershipsId);
    }
    setIsReviewChecked(true);
  } catch (error) {
    sentryError(error);
  }
};
