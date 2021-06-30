import {useNavigation} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useState} from "react";
import {ScrollView, Text, View} from "react-native";
import {CONTENT_CONTAINER} from "../assets/constants/styles";
import {Formik} from "formik";
import signInValidationSchema from "../utils/signInValidationSchema";
import AppTextInput from "../components/common/AppTextInput";
import AuthButton from "../components/auth/AuthButton";
import SocialSignIn from "../components/auth/SocialSignIn";
import {ScaledSheet} from "react-native-size-matters";
import {CONTENT} from "../assets/constants/colors";
import AuthHeader from "../components/auth/AuthHeader";
import {forgotPasswordScreen} from "../navigation/routes";
import LoadingIndicator from "../components/common/LoadingIndicator";
import {login} from "../helpers/login";

export default function SignInScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [isLoading, setLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={CONTENT_CONTAINER}>
            <AuthHeader text1="Welcome," text2="Sign in to continue!" />

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={signInValidationSchema}
              onSubmit={async (values) =>
                await login(
                  values.email,
                  values.password,
                  setLoading,
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
                      isPass={true}
                      onBlur={handleBlur("password")}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    <Text
                      style={styles.forgotPass}
                      onPress={() => navigation.navigate(forgotPasswordScreen)}
                    >
                      Forgot Password?
                    </Text>
                  </View>
                  <AuthButton
                    label="Login"
                    questionText="Don't have an account"
                    actionText="Signup"
                    onHandlePress={handleSubmit}
                  />
                </>
              )}
            </Formik>

            <SocialSignIn optionText="Or login with" />
          </View>
        </ScrollView>
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
  forgotPass: {
    width: "100%",
    textAlign: "right",
    fontSize: "13@s",
    fontWeight: "500",
    color: CONTENT,
  },
  errorText: {
    fontSize: "10@s",
    color: "red",
  },
});
