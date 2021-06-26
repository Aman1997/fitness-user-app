export const getMembershipType = (type: number) => {
  if (type === 1) return "1 month";
  if (type === 2) return "3 months";
  if (type === 3) return "6 months";
  if (type === 4) return "12 months";
};

export const calculateCGST = (amount: number): number => {
  return amount * 0.1;
};

export const calculateSGST = (amount: number): number => {
  return amount * 0.1;
};

export const calculateTotal = (
  amount: number,
  sgst: number,
  cgst: number,
): number => {
  // @ts-ignore
  return (parseFloat(amount) + sgst + cgst).toFixed(2);
};
