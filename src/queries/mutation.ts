export const CANCEL_BOOKING = `
    mutation CANCEL_BOOKING($id: ID!) {
        updateBookings(input: { id: $id, status: "cancelled" }) {
        id
        }
    }
`;

export const UPDATE_USER_DETAILS = `
    mutation UPDATE_USER_DETAILS(
        $email: String!
        $id: ID!
        $name: String!
        $imageUrl: String!
    ) {
        updateUser( input: { email: $email, id: $id, name: $name, imageUrl: $imageUrl }) {
        id
        }
    }
`;
export const CREATE_SESSION = `
    mutation CREATE_SESSION(
        $bookingDate: String!
        $fitnessPartnerId: ID!
        $pin: Int!
        $status: String!
        $timeSlot: String!
        $userEmail: String!
        $orderId: String!
    ) {
        createBookings(input: {bookingDate: $bookingDate, fitnessServiceId: $fitnessPartnerId, pin: $pin, status: $status, timeSlot: $timeSlot, userEmail: $userEmail, orderId: $orderId, isVerified: false, isReviewed: false}) {
        id
        }
    }  
`;

export const CREATE_MEMBERSHIP = `
    mutation CREATE_MEMBERSHIP(
        $fitnessPartnerId: ID!
        $from: String!
        $to: String!
        $type: Int!
        $userEmail: String!
        $orderId: String!
    )  {
        createMemberships(input: {fitnessServiceId: $fitnessPartnerId, from: $from, to: $to, type: $type, userEmail: $userEmail, orderId: $orderId, isReviewed: false}) {
        id
        }
    }
  
`;

export const LOG_USER_ACITIVITY = `
    mutation LOG_USER_ACITIVITY($metadata: String!, $type: String!, $userEmail: String!) {
        createUserActivities(input: {metadata: $metadata, type: $type, userEmail: $userEmail}) {
        id
        }
    }
`;

export const CREATE_REVIEWS = `
    mutation CREATE_REVIEWS($fitnessServiceId: ID!, $ratings: Float!, $review: String, $userEmail: String!) {
        createReviews(input: {fitnessServiceId: $fitnessServiceId, ratings: $ratings, review: $review, userEmail: $userEmail}) {
            id
        }
    }
`;

export const UPDATE_USER_BOOKING_REVIEW_STATUS = `
    mutation UPDATE_USER_BOOKING_REVIEW_STATUS($id: ID!) {
        updateBookings(input: {id: $id, isReviewed: true}) {
            id                     
        }
    }
`;

export const UPDATE_USER_MEMBERSHIP_REVIEW_STATUS = `
    mutation UPDATE_USER_MEMBERSHIP_REVIEW_STATUS($id: ID!) {
        updateMemberships(input: {id: $id, isReviewed: true}) {
            id
            isReviewed
        }
    }
`;
