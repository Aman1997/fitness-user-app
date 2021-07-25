import {format} from "date-fns";
import {LOG_TYPE} from "./constants";
import {getPlanName} from "./membershipMethods";

export const buildUserActivityDesc = (content: string, type: string) => {
  const metadata = JSON.parse(content);
  if (type === LOG_TYPE.session_booked) {
    return `Booked a session at ${metadata?.partnerName} for ${format(
      new Date(metadata?.date),
      "dd MMMM yyyy",
    )}`;
  }
  if (type === LOG_TYPE.session_cancelled) {
    return `Cancelled a session at ${metadata?.partnerName} for ${format(
      new Date(metadata?.date),
      "dd MMMM yyyy",
    )}`;
  }
  if (type === LOG_TYPE.membership_booked) {
    return `Booked a ${getPlanName(metadata?.type)} membership at ${
      metadata?.partnerName
    }`;
  }
  if (type === LOG_TYPE.membership_renewed) {
    return `Renewed a ${getPlanName(metadata?.type)} membership at ${
      metadata?.partnerName
    }`;
  }
};
