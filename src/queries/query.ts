export const LIST_FITNESS_PARTNERS = `
    query LIST_FITNESS_PARTNERS($type: Int, $city: String!) {
        listFitnessServices(
          filter: { type: { eq: $type }, city: { contains: $city }, status: { eq: 1} }
        ) {
          items {
            id
            name
            imageUrl
            ratings
            type
            longitude
            latitude
            address
            about
            trainerImageUrl
            tags
            plans {
                items {
                    id
                    price
                    type
                    timeSlotFrom
                    timeSlotTo
                    batch
                    days
                }
            }
          }
          nextToken
        }
    }
`;

export const GET_USER_DATA = `
    query GET_USER_DATA($email: String!) {
        getUser(email: $email) {
        id
        email
        name
        imageUrl
        phoneNumber
        }
    }
`;

export const GET_USER_ACTIVITIES = `
query GET_USER_ACTIVITIES($email: String!) {
  getUser(email: $email) {
    userActivity(limit: 10, sortDirection: DESC) {
      items {
        id
        metadata
        type
      }
    }
  }
}
`;

export const SEARCH_FITNESS_PARTNER_BY_NAME = `
  query SEARCH_FITNESS_PARTNER_BY_NAME($name: String, $nextToken: String) {
    listFitnessServices(
      nextToken: $nextToken
      limit: 10
      filter: { name: { contains: $name } }
    ) {
      items {
        id
        name
        imageUrl
        ratings
        type
        longitude
        latitude
        address
        about
        trainerImageUrl
        tags
        plans {
            items {
                id
                type
                batch
                timeSlotTo
                timeSlotFrom
                price
                days
            }
        }
      }
      nextToken
    }
  }
`;

export const FETCH_REVIEWS = `
  query FETCH_REVIEWS($id: ID!) {
    getFitnessService(id: $id) {
      reviews {
        items {
          id
          ratings
          review
          user {
            id
            name
            imageUrl
          }
          createdAt
        }
      }
    }
  }
`;

export const CURRENT_USER_BOOKINGS = `
query CURRENT_USER_BOOKINGS($email: String!) {
  getUser(email: $email)  {
    bookings(sortDirection: DESC) {
      items {
        id
        bookingDate
        status
        pin
        timeSlot
        fitnessService {
          id
          longitude
          latitude
          name
          imageUrl
          trainerName
          trainerImageUrl
        }
      }
    }
    memberships(sortDirection: DESC) {
      items {
        id
        to
        from
        fitnessService {
          id
          name
          imageUrl
          ratings
          address
          plans {
            items {
                id
                price
                type
                batch
                days
            }
        }
        }
      }
    }
  }
}
`;

export const COMPLETED_BOOKINGS = `
query COMPLETED_BOOKINGS($email: String!, $to: String!) {
  getUser(email: $email) {
    bookings(filter: {status: {eq: "completed"}}, sortDirection: DESC) {
      items {
        id
        status
        isReviewed        
        fitnessService {
          id
          name
        }
      }
    }
    memberships(filter: {to: {le: $to}}, sortDirection: DESC) {
      items {
        id
        to                
        isReviewed
        fitnessService {
          id
          name          
        }
      }
    }
  }
}
`;
