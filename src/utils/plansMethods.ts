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
