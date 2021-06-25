import React from "react";
import {Text, View} from "react-native";
import {ScaledSheet} from "react-native-size-matters";
import {HEAD_TEXT} from "../../assets/constants/colors";
import AboutCard from "./AboutCard";

const AboutContainer = ({
  sessions,
  memberships,
}: {
  sessions: string;
  memberships: string;
}) => {
  return (
    <View>
      <Text style={styles.headText}>About</Text>
      <View style={styles.aboutCardContainer}>
        <AboutCard
          bgColor="rgba(192, 53, 70, 0.2)"
          contentText="Sessions completed"
          numericalText={sessions}
        />
        <AboutCard
          bgColor="rgba(129, 180, 230, 0.2)"
          contentText="Memberships taken"
          numericalText={memberships}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  headText: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: "15@s",
    marginBottom: "10@s",
    marginTop: "30@s",
    color: HEAD_TEXT,
  },
  aboutCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: "20@s",
  },
});

export default AboutContainer;
