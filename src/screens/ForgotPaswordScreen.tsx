import {useNavigation} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import {Formik} from "formik";
import React, {useState} from "react";
import {Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {SECONDARY} from "../assets/constants/colors";
import {CONTENT_CONTAINER} from "../assets/constants/styles";
import AppButton from "../components/common/AppButton";
import AppPageTitle from "../components/common/AppPageTitle";
import AppTextInput from "../components/common/AppTextInput";
import {createNewPassword} from "../helpers/createNewPassword";
import {createOTP} from "../helpers/createOTP";
import {
  emailValidationSchema,
  otpPasswordValidationSchema,
} from "../utils/forgotPasswordValidationSchema";

export default function ForgotPaswordScreen() {
  const [codeGeneration, setCodeGeneration] = useState(true);
  const [email, setEmail] = useState("");

  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <View style={CONTENT_CONTAINER}>
        <AppPageTitle pageTitle="Forgot Password" />

        {codeGeneration ? (
          // Generating the code
          <Formik
            initialValues={{
              userEmail: "",
            }}
            validationSchema={emailValidationSchema}
            onSubmit={async (values) =>
              await createOTP(
                values.userEmail,
                setCodeGeneration,
                setEmail,
                navigation,
              )
            }
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              touched,
              values,
              errors,
            }) => (
              <View style={styles.inputContainer}>
                <AppTextInput
                  label="User email"
                  value={values.userEmail}
                  onBlur={handleBlur("userEmail")}
                  onChangeValue={handleChange("userEmail")}
                />
                {errors.userEmail && touched.userEmail && (
                  <Text style={styles.errorText}>{errors.userEmail}</Text>
                )}

                <AppButton
                  text="Generate OTP"
                  textStyle={{
                    color: "#fff",
                    fontWeight: "500",
                    fontSize: scale(16),
                  }}
                  containerStyle={{
                    backgroundColor: SECONDARY,
                    paddingVertical: scale(15),
                    width: "100%",
                    borderRadius: scale(25),
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: scale(30),
                    marginBottom: scale(10),
                  }}
                  onPressHandle={handleSubmit}
                />
              </View>
            )}
          </Formik>
        ) : (
          // creating password
          <Formik
            initialValues={{
              code: "",
              newPassword: "",
            }}
            validationSchema={otpPasswordValidationSchema}
            onSubmit={async (values) =>
              createNewPassword(
                email,
                values.code,
                values.newPassword,
                navigation,
              )
            }
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              touched,
              values,
              errors,
            }) => (
              <View style={styles.inputContainer}>
                <AppTextInput
                  label="Code"
                  value={values.code}
                  onBlur={handleBlur("code")}
                  onChangeValue={handleChange("code")}
                />
                {errors.code && touched.code && (
                  <Text style={styles.errorText}>{errors.code}</Text>
                )}

                <AppTextInput
                  label="New Password"
                  value={values.newPassword}
                  onBlur={handleBlur("newPassword")}
                  onChangeValue={handleChange("newPassword")}
                  isPass={true}
                />
                {errors.newPassword && touched.newPassword && (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                )}

                <View style={{flex: 1, justifyContent: "flex-end"}}>
                  <AppButton
                    text="Update"
                    textStyle={{
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: scale(16),
                    }}
                    containerStyle={{
                      backgroundColor: SECONDARY,
                      paddingVertical: scale(15),
                      width: "100%",
                      borderRadius: scale(25),
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: scale(30),
                      marginBottom: scale(10),
                    }}
                    onPressHandle={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        )}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: "20@s",
  },
  inputContainer: {
    marginVertical: "20@s",
    flex: 1,
  },
  errorText: {
    fontSize: "10@s",
    color: "red",
  },
});
