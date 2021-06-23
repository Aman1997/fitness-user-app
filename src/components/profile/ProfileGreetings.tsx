import React from "react";
import {Dimensions} from "react-native";
import {Image, Text, View} from "react-native";
import {ScaledSheet} from "react-native-size-matters";

const WIDTH = Dimensions.get("window").width;

const ProfileGreetings = ({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl: string;
}) => {
  return (
    <View style={styles.greetingsContainer}>
      <Text style={styles.greetingsText}>Hi, {name}</Text>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.profileImage}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  greetingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "15@s",
  },
  greetingsText: {
    fontWeight: "bold",
    fontSize: "28@s",
    paddingRight: "15@s",
    width: WIDTH - 160,
  },
  profileImage: {
    height: "90@s",
    width: "90@s",
    borderRadius: "45@s",
  },
});

export default ProfileGreetings;
