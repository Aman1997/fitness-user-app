export const CANCEL_BOOKING = `
    mutation CANCEL_BOOKING($id: ID!) {
        updateBookings(input: { id: $id, status: "cancelled" }) {
        id
        }
    }
`;
