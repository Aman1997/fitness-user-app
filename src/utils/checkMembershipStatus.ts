import {differenceInDays} from "date-fns";

export const checkMembershipStatus = (to: string) => {
  return differenceInDays(Date.now(), Date.parse(to)) <= 0;
};
