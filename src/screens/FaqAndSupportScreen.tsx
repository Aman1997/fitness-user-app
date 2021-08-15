import React from "react";
import {Text, View, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {ScaledSheet, scale} from "react-native-size-matters";
import AppHeaderBack from "../components/common/AppHeaderBack";
import AppPageTitle from "../components/common/AppPageTitle";
import {Entypo} from "@expo/vector-icons";
import {contactUsScreen} from "../navigation/routes";
import {
  CONTENT,
  HEAD_TEXT,
  ICONS,
  PRIMARY_20,
} from "../assets/constants/colors";
import AppListAccordion from "../components/common/AppListAccordion";
import {CONTENT_CONTAINER} from "../assets/constants/styles";

const DATA = [
  {
    id: 1,
    heading: "Till when can I cancel the adhoc session?",
    descText: "Adhoc sessions can be cancelled upto 3 hours before the session",
  },
  {
    id: 2,
    heading: "Can I book a session for 20 days later?",
    descText: "Adhoc sessions can be bookend uptill the next 15 days.",
  },
  {
    id: 3,
    heading: "Will the personal trainer sessions be held online?",
    descText:
      "In case of personal trainer's sessions, the delivery of the session whether online or offline is dependent on the trainer and would be notified before in the service description.",
  },
];

export default function FaqAndSupportScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppHeaderBack />

      <View style={styles.contentContainer}>
        <AppPageTitle
          pageTitle="FAQ & Support"
          textStyles={{textTransform: "none"}}
        />
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Text style={styles.descText}>
            Didn’t find the answer you were looking for? Contact our support
            center!
          </Text>

          <View style={styles.listContainer}>
            <View style={styles.iconContainer}>
              <Entypo
                name="mail"
                size={scale(15)}
                color={ICONS}
                onPress={() => navigation.navigate(contactUsScreen)}
              />
            </View>

            <Text
              style={styles.listItem}
              onPress={() => navigation.navigate(contactUsScreen)}
            >
              Contact Us
            </Text>
          </View>

          <View style={{marginVertical: scale(20)}}>
            <AppListAccordion data={DATA} />
          </View>
        </ScrollView>
      </View>
    </View>
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
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20@s",
  },
  listItem: {
    color: HEAD_TEXT,
    fontSize: "16@s",
    marginLeft: "10@s",
  },
  iconContainer: {
    borderRadius: "15@s",
    backgroundColor: PRIMARY_20,
    height: "30@s",
    width: "30@s",
    justifyContent: "center",
    alignItems: "center",
  },
});
