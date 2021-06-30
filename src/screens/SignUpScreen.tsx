import Auth from "@aws-amplify/auth";
import {useNavigation} from "@react-navigation/core";
import {Formik} from "formik";
import React, {useState} from "react";
import {Alert, ScrollView, Text, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT} from "../assets/constants/colors";
import {
  APP_MARGIN_HORIZONTAL,
  CONTENT_CONTAINER,
} from "../assets/constants/styles";
import AuthButton from "../components/auth/AuthButton";
import AuthHeader from "../components/auth/AuthHeader";
import SocialSignIn from "../components/auth/SocialSignIn";
import AppTextInput from "../components/common/AppTextInput";
import LoadingIndicator from "../components/common/LoadingIndicator";
import {signUp} from "../helpers/signUp";
import {verifySignUpScreen} from "../navigation/routes";
import signUpValidationSchema from "../utils/signUpValidationSchema";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginTop: scale(10)}}
          >
            <View style={CONTENT_CONTAINER}>
              <AuthHeader
                text1="Create Account,"
                text2="Sign up to get started!"
              />

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  name: "",
                  phoneNumber: "",
                }}
                onSubmit={async (values) =>
                  await signUp(
                    values.email,
                    values.password,
                    values.name,
                    values.phoneNumber,
                    setLoading,
                    navigation,
                  )
                }
                validationSchema={signUpValidationSchema}
              >
                {({
                  handleSubmit,
                  handleBlur,
                  handleChange,
                  touched,
                  values,
                  errors,
                }) => (
                  <>
                    <View style={styles.inputContainer}>
                      <AppTextInput
                        label="Email ID"
                        value={values.email}
                        onChangeValue={handleChange("email")}
                        onBlur={handleBlur("email")}
                      />
                      {errors.email && touched.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                      <AppTextInput
                        label="Password"
                        value={values.password}
                        onChangeValue={handleChange("password")}
                        onBlur={handleBlur("password")}
                        isPass={true}
                      />
                      {errors.password && touched.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                      <AppTextInput
                        label="Name"
                        value={values.name}
                        onChangeValue={handleChange("name")}
                        onBlur={handleBlur("name")}
                      />
                      {errors.name && touched.name && (
                        <Text style={styles.errorText}>{errors.name}</Text>
                      )}
                      <AppTextInput
                        label="Phone number"
                        value={values.phoneNumber}
                        onChangeValue={handleChange("phoneNumber")}
                        onBlur={handleBlur("phoneNumber")}
                        isNumKeypad={true}
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <Text style={styles.errorText}>
                          {errors.phoneNumber}
                        </Text>
                      )}
                    </View>

                    <AuthButton
                      label="Signup"
                      questionText="Already have an account"
                      actionText="SignIn"
                      onHandlePress={handleSubmit}
                    />
                  </>
                )}
              </Formik>

              <SocialSignIn optionText="Or continue with" />
            </View>

            <View style={styles.privacyPolicyContainer}>
              <Text
                style={{
                  textAlign: "center",
                  color: CONTENT,
                  fontSize: scale(10),
                  width: "70%",
                }}
              >
                By signing in, you agree to our Terms of Use and Privacy Policy
              </Text>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      )}
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: "20@s",
  },
  inputContainer: {
    marginVertical: "20@s",
  },
  privacyPolicyContainer: {
    marginHorizontal: APP_MARGIN_HORIZONTAL,
    marginBottom: "30@s",
    alignItems: "center",
  },
  errorText: {
    fontSize: "10@s",
    color: "red",
  },
});
