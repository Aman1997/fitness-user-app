import {SHORT_DAYS} from "./constants";

export const minPriceString = (
  plans: Array<{
    type: number;
    batch: number;
    timeSlotTo: string;
    timeSlotFrom: string;
    price: string;
  }>,
  type: number,
): string => {
  const selectedPlanArr = plans
    .filter((plan) => plan.type === type)
    .sort((a, b) => parseInt(a.price) - parseInt(b.price));

  if (selectedPlanArr.length === 1) {
    return `@ ₹ ${selectedPlanArr[0].price}`;
  }
  return `starting @ ₹ ${selectedPlanArr[0].price}`;
};

export const getPlanDays = (data: Array<number>) => {
  data.sort();
  // @ts-ignore
  return data.map((item) => SHORT_DAYS[item]);
};
