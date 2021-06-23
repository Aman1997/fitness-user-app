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
