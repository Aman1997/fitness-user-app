import {Dispatch, SetStateAction} from "react";

export const getPlanPrice = (
  type: number,
  plansData: Array<{
    id: string;
    price: string;
    type: number;
  }>,
) => {
  return plansData.filter((plan) => plan.type === type)[0]?.price;
};

export const getPlanType = (isPlanSelected: {
  monthly: boolean;
  quarterly: boolean;
  halfYearly: boolean;
  yearly: boolean;
}) => {
  if (isPlanSelected.monthly === true) return 1;
  if (isPlanSelected.quarterly === true) return 2;
  if (isPlanSelected.halfYearly === true) return 3;
  if (isPlanSelected.yearly === true) return 4;
};

export const getPlanName = (type: number) => {
  if (type === 1) return "1 month";
  if (type === 2) return "3 months";
  if (type === 3) return "6 months";
  if (type === 4) return "12 months";
};

export const handleRadioClick = (
  data: string,
  setPlanSelected: Dispatch<
    SetStateAction<{
      monthly: boolean;
      quarterly: boolean;
      halfYearly: boolean;
      yearly: boolean;
    }>
  >,
) => {
  if (data === "1 month") {
    setPlanSelected({
      monthly: true,
      quarterly: false,
      halfYearly: false,
      yearly: false,
    });
  } else if (data === "3 months") {
    setPlanSelected({
      monthly: false,
      quarterly: true,
      halfYearly: false,
      yearly: false,
    });
  } else if (data === "6 months") {
    setPlanSelected({
      monthly: false,
      quarterly: false,
      halfYearly: true,
      yearly: false,
    });
  } else {
    setPlanSelected({
      monthly: false,
      quarterly: false,
      halfYearly: false,
      yearly: true,
    });
  }
};
