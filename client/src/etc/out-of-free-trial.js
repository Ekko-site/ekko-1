import moment from "moment";
import freeTrialDays from "@/config/free-trial";

export default user => {
  const daysIntoFreeTrial = moment().diff(moment(user.createdAt), "days");
  const left = freeTrialDays - daysIntoFreeTrial;
  return {
    outOfFreeTrial: daysIntoFreeTrial > freeTrialDays,
    left: left < 0 ? 0 : left
  };
};
