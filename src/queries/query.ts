export const LIST_FITNESS_PARTNERS = `
    query LIST_FITNESS_PARTNERS($nextToken: String, $type: Int, $city: String!) {
        listFitnessServices(
          limit: 6
          nextToken: $nextToken
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
                }
            }
            availableSlots {
                items {
                    day
                    timeSlots
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
                price
                type
            }
        }
        availableSlots {
            items {
                day
                timeSlots
            }
        }
      }
      nextToken
    }
  }
`;
