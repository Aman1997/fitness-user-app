import {API, graphqlOperation} from "aws-amplify";
import {
  CREATE_REVIEWS,
  UPDATE_USER_BOOKING_REVIEW_STATUS,
} from "../queries/mutation";

export const createReview = async (
  fitnessServiceId: string,
  ratings: Number,
  review: string,
  userEmail: string,
) => {
  const res = await API.graphql(
    graphqlOperation(CREATE_REVIEWS, {
      fitnessServiceId,
      ratings,
      review,
      userEmail,
    }),
  );
};

export const updateReview = async (id: string) => {
  const res = await API.graphql(
    graphqlOperation(UPDATE_USER_BOOKING_REVIEW_STATUS, {
      id,
    }),
  );
};
