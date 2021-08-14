import React from "react";
import {Text, View, TouchableWithoutFeedback, Image} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT, WHITE} from "../../assets/constants/colors";
import {getTimeElapsed} from "../../utils/dateTimeMethods";

interface IProps {
  reviewsData: {
    imageUrl: string;
    name: string;
    createdAt: string;
    review: string;
  };
  onReviewSelected?: () => void;
}

export default function ReviewCard({reviewsData, onReviewSelected}: IProps) {
  return (
    <TouchableWithoutFeedback onPress={onReviewSelected}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: reviewsData.imageUrl || "https://picsum.photos/300",
            }}
            style={styles.profileIcon}
          />
          <View>
            <Text style={styles.name}>{reviewsData.name}</Text>
            <Text style={{fontSize: scale(10), color: HEAD_TEXT}}>
              {getTimeElapsed(reviewsData.createdAt)}
            </Text>
          </View>
        </View>
        <Text style={styles.reviewText} numberOfLines={5}>
          {reviewsData.review}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  container: {
    height: "140@s",
    width: "200@s",
    backgroundColor: WHITE,
    borderRadius: "10@s",
    shadowColor: "#929290",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 4,
    },
    elevation: 3,
    padding: "15@s",
    marginRight: "15@s",
    marginBottom: "10@s",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    height: "25@s",
    width: "25@s",
    borderRadius: "20@s",
    marginRight: "15@s",
  },
  name: {
    fontSize: "14@s",
    fontWeight: "500",
    color: HEAD_TEXT,
  },
  reviewText: {
    marginTop: "10@s",
    fontSize: "12@s",
    lineHeight: "14@s",
    color: CONTENT,
  },
});
