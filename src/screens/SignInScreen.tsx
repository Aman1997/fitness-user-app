import {useNavigation} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useEffect, useState} from "react";
import {Platform, ScrollView, Text, View} from "react-native";
import {CONTENT_CONTAINER} from "../assets/constants/styles";
import {Formik} from "formik";
import signInValidationSchema from "../utils/signInValidationSchema";
import AppTextInput from "../components/common/AppTextInput";
import AuthButton from "../components/auth/AuthButton";
import SocialSignIn from "../components/auth/SocialSignIn";
import {ScaledSheet} from "react-native-size-matters";
import {CONTENT} from "../assets/constants/colors";
import AuthHeader from "../components/auth/AuthHeader";
import {appHomeScreen, forgotPasswordScreen} from "../navigation/routes";
import LoadingIndicator from "../components/common/LoadingIndicator";
import {login} from "../helpers/login";
import {Auth, Hub} from "aws-amplify";
import axios from "axios";
import Config from "react-native-config";
import {fetchJWT} from "../helpers/fetchJWT";
import setUserId from "../utils/setUserId";

export default function SignInScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Hub.listen("auth", async ({payload: {event, data}}) => {
      switch (event) {
        case "signIn":
          const authUser = await Auth.currentAuthenticatedUser();
          const params = {
            email: authUser.attributes.email,
            name: authUser.attributes["custom:name"] || "",
            phoneNumber: authUser.attributes["custom:phoneNumber"] || "",
            imageUrl: authUser.attributes.picture || "",
          };
          const {data} = await axios.post(Config.SOCIAL_SIGN_IN, params, {
            headers: await fetchJWT(),
          });
          if (data.status === "Success") {
            await setUserId(authUser.attributes.email);
            setLoading(false);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: appHomeScreen,
                },
              ],
            });
          }
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
      }
    });
  }, []);

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
              onSubmit={async (values) => {
                await login(
                  values.email,
                  values.password,
                  setLoading,
                  navigation,
                );
              }}
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

            <SocialSignIn
              optionText="Or login with"
              setLoading={setLoading}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? "40@s" : "20@s",
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
