import React from "react";
import {Image, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT, WHITE} from "../../assets/constants/colors";
import {IUserState} from "../../redux/reducers/userReducer";
import {buildUserActivityDesc} from "../../utils/buildUserActivityDesc";

const Activity = ({content, type}: {content: string; type: string}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: scale(10),
      }}
    >
      <Image
        source={require("../../assets/images/icon.png")}
        style={{height: scale(40), width: scale(40), borderRadius: scale(20)}}
      />
      <Text
        style={{
          fontSize: scale(14),
          color: CONTENT,
          paddingLeft: scale(15),
          paddingRight: scale(20),
        }}
      >
        {buildUserActivityDesc(content, type)}
      </Text>
    </View>
  );
};

const ActivityContainer = ({
  activities,
}: {
  activities: IUserState["activities"];
}) => {
  return (
    <View>
      <Text style={styles.headText}>Activity</Text>

      {!activities?.length ? (
        <View style={{marginVertical: scale(20), alignItems: "center"}}>
          <Text style={{color: CONTENT, fontWeight: "bold"}}>
            Your activities will be shown here
          </Text>
        </View>
      ) : (
        <View style={styles.activityContainer}>
          {activities?.map((activity, index) => (
            <Activity
              content={activity.metadata}
              type={activity.type}
              key={index}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  activityContainer: {
    // marginBottom: "10@s",
    marginVertical: "10@s",
    paddingVertical: "12@s",
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
