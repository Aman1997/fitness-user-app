import * as yup from 'yup'

const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    name: yup
      .string()
      .required('Name is required'),
    phoneNumber: yup
      .string()
      .min(10, ({ min }) => `Phone number must be at least ${min} characters`)
      .max(10, ({ max }) => `Phone number should not be more than ${max} characters`)
      .required('Phone number is required')    
  })

  export default signUpValidationSchema