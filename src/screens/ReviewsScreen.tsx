import React from "react";
import {FlatList, Text, View, Image} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {HEAD_TEXT, WHITE} from "../assets/constants/colors";
import AppHeaderBack from "../components/common/AppHeaderBack";
import {getTimeElapsed} from "../utils/dateTimeMethods";

const data = [
  {
    id: 1,
    profileName: "Aman 1",
    profileImage: "http://picsum.photos/200",
    periodPublished: "2 days ago",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    profileName: "Aman 2",
    profileImage: "http://picsum.photos/200",
    periodPublished: "2 months ago",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute.... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sequat.",
  },
  {
    id: 3,
    profileName: "Aman 3",
    profileImage: "http://picsum.photos/200",
    periodPublished: "2 weeks ago",
    review:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident",
  },
  {
    id: 4,
    profileName: "Aman 4",
    profileImage: "http://picsum.photos/200",
    periodPublished: "12 days ago",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute",
  },
  {
    id: 5,
    profileName: "Aman 5",
    profileImage: "http://picsum.photos/200",
    periodPublished: "2 days ago",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 6,
    profileName: "Aman 6",
    profileImage: "http://picsum.photos/200",
    periodPublished: "2 months ago",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute",
  },
  {
    id: 7,
    profileName: "Aman 7",
    profileImage: "http://picsum.photos/200",
    periodPublished: "2 weeks ago",
    review:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident",
  },
  {
    id: 8,
    profileName: "Aman 8",
    profileImage: "http://picsum.photos/200",
    periodPublished: "12 days ago",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute",
  },
];
const user = {
  imageUrl: "https://picsum.photos/30",
  name: "Aman",
};
const createdAt = "2011-10-05T14:48:00.000Z";

export default function ReviewsScreen() {
  return (
    <View style={styles.container}>
      <AppHeaderBack
        extraStyles={{
          backgroundColor: "rgba(255,255,255,0.8)",
          position: "absolute",
          zIndex: 1,
          borderTopRightRadius: scale(10),
          borderBottomRightRadius: scale(10),
          marginTop: scale(10),
        }}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.reviewCardContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{uri: user.imageUrl}}
                  style={{height: 60, width: 60, borderRadius: 30}}
                />
                <View style={{marginLeft: 20}}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.period}>{getTimeElapsed(createdAt)}</Text>
                </View>
              </View>
              <Text style={styles.review}>{item.review}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scale(20),
          paddingVertical: scale(60),
        }}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: "40@s",
  },
  reviewCardContainer: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 20,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: WHITE,
    marginVertical: 10,
    padding: 15,
  },
  name: {
    fontWeight: "500",
    fontSize: "18@s",
    textTransform: "capitalize",
  },
  period: {
    color: HEAD_TEXT,
    marginTop: "5@s",
  },
  review: {
    opacity: 0.7,
  },
});
