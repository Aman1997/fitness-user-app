import React from "react";
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT, WHITE} from "../../assets/constants/colors";

const Activities = [
  {
    content: "Booked a session at Gold's Gym for 29th Mar, 2020 ",
  },
  {
    content: "Booked a session at Gold's Gym for 29th Mar, 2020 ",
  },
  {
    content: "Booked a session at Gold's Gym for 29th Mar, 2020 ",
  },
  {
    content: "Booked a session at Gold's Gym for 29th Mar, 2020 ",
  },
  {
    content: "Booked a session at Gold's Gym for 29th Mar, 2020 ",
  },
  {
    content: "Booked a session at Gold's Gym for 29th Mar, 2020 ",
  },
];

const Activity = ({content}: {content: string}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: scale(10)
      }}
    >
      <Image
        source={require("../../assets/images/tempLogo.png")}
        style={{height: scale(30), width: scale(30), borderRadius: scale(15)}}
      />
      <Text
        style={{
          fontSize: scale(14),
          color: CONTENT,
          paddingLeft: scale(15),
          paddingRight: scale(10),
        }}
      >
        {content}
      </Text>
    </View>
  );
};

const ActivityContainer = () => {
  return (
    <View>
      <Text style={styles.headText}>Activity</Text>
      <View style={styles.activityContainer}>
        <FlatList
          data={Activities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Activity content={item.content} />}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  activityContainer: {
    marginBottom: "10@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: "20@s",
    backgroundColor: WHITE,
    padding: "12@s",
  },
  headText: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: "15@s",
    marginBottom: "10@s",
    marginTop: "30@s",
    color: HEAD_TEXT,
  },
});

export default ActivityContainer;
