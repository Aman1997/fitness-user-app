import {API, graphqlOperation} from "aws-amplify";
import {
  CREATE_REVIEWS,
  UPDATE_USER_BOOKING_REVIEW_STATUS,
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

export const updateReview = async (id: string) => {
  try {
    await API.graphql(
      graphqlOperation(UPDATE_USER_BOOKING_REVIEW_STATUS, {
        id,
      }),
    );
  } catch (error) {
    sentryError(error);
  }
};
