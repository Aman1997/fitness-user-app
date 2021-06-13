import {Auth} from "aws-amplify";

export const fetchJWT = async () => {
  return {
    Authorization: `Bearer ${(await Auth.currentSession())
      .getIdToken()
      .getJwtToken()}`,
  };
};
