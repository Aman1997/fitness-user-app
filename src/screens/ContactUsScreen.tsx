import React, {useState} from "react";
import {Text, View, ScrollView, Dimensions, Modal} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {TextInput} from "react-native-paper";
import {ScaledSheet, scale} from "react-native-size-matters";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AppHeaderBack from "../components/common/AppHeaderBack";
import AppPageTitle from "../components/common/AppPageTitle";
import AppButton from "../components/common/AppButton";
import LoadingIndicator from "../components/common/LoadingIndicator";
import {useSelector} from "react-redux";
import {IUserState} from "../redux/reducers/userReducer";
import {CONTENT, PRIMARY, SECONDARY} from "../assets/constants/colors";
import {CONTENT_CONTAINER} from "../assets/constants/styles";
import SupportModal from "../components/profile/SupportModal";
import {createTicket} from "../helpers/createSupportTicket";

export default function ContactUsScreen() {
  const navigation = useNavigation();

  const user = useSelector((state: {user: IUserState}) => state.user);

  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <AppHeaderBack />
          <Modal animationType="fade" transparent={true} visible={isSubmitted}>
            <SupportModal setSubmitted={setSubmitted} />
          </Modal>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            bounces={false}
          >
            <View style={styles.contentContainer}>
              <AppPageTitle pageTitle="Contact Us" />

              <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{flex: 1}}
              >
                <Text style={styles.descText}>
                  Leave us a message, we will get in touch with you as soon as
                  possible.
                </Text>

                <TextInput
                  label="What do you want to tell us about?"
                  mode="outlined"
                  numberOfLines={15}
                  multiline={true}
                  value={query}
                  onChangeText={(text) => setQuery(text as string)}
                  style={{
                    marginVertical: scale(25),
                    backgroundColor: "#fff",
                    maxHeight: scale(Dimensions.get("window").height / 3),
                  }}
                  theme={{colors: {primary: PRIMARY}}}
                  returnKeyType="done"
                />

                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    marginVertical: scale(25),
                  }}
                >
                  <AppButton
                    text="Submit"
                    textStyle={{
                      color: "#fff",
                      fontSize: scale(16),
                      fontWeight: "500",
                    }}
                    containerStyle={{
                      backgroundColor: SECONDARY,
                      padding: scale(15),
                      borderRadius: scale(25),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPressHandle={() =>
                      createTicket(
                        setLoading,
                        query,
                        user,
                        setQuery,
                        setSubmitted,
                        navigation,
                      )
                    }
                  />
                </View>
              </ScrollView>
            </View>
          </KeyboardAwareScrollView>
        </>
      )}
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: CONTENT_CONTAINER,
  descText: {
    color: CONTENT,
    fontSize: "14@s",
  },
});
