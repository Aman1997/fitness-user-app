import * as yup from "yup";

export const emailValidationSchema = yup.object().shape({
  userEmail: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
});

export const otpPasswordValidationSchema = yup.object().shape({
  code: yup
    .string()
    .min(6, ({min}) => `OTP must be atleast ${min}`)
    .required("OTP is required"),
  newPassword: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});
