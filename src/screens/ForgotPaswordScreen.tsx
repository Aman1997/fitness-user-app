import Auth from "@aws-amplify/auth";
import {useNavigation} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import {Formik} from "formik";
import React, {useState} from "react";
import {Alert, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {SECONDARY} from "../assets/constants/colors";
import {CONTENT_CONTAINER} from "../assets/constants/styles";
import AppButton from "../components/common/AppButton";
import AppPageTitle from "../components/common/AppPageTitle";
import AppTextInput from "../components/common/AppTextInput";
import {
  emailValidationSchema,
  otpPasswordValidationSchema,
} from "../utils/forgotPasswordValidationSchema";

export default function ForgotPaswordScreen() {
  const [codeGeneration, setCodeGeneration] = useState(true);
  const [email, setEmail] = useState("");

  const navigation = useNavigation<StackNavigationProp<any>>();

  // create the OTP
  const createCode = async (email: string) => {
    try {
      await Auth.forgotPassword(email.toLowerCase());
      Alert.alert("OPT has been generated and sent to your mail!");
      setCodeGeneration(false);
      setEmail(email.toLowerCase());
    } catch (error) {
      console.log("Some error occured while creating a code");
    }
  };

  // create new password
  const createNewPassword = async (code: string, newPassword: string) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      Alert.alert("Password has been successfully changed");
      navigation.replace("signInScreen");
    } catch (error) {
      console.log("Some error occured while creating a new password");
    }
  };

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
            onSubmit={(values) => createCode(values.userEmail)}
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
            onSubmit={(values) =>
              createNewPassword(values.code, values.newPassword)
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
