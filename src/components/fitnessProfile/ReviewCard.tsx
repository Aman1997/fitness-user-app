import React from "react";
import {Text, View, TouchableWithoutFeedback, Image} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT} from "../../assets/constants/colors";
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
              uri: reviewsData.imageUrl,
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
    borderWidth: "1@s",
    borderRadius: "10@s",
    borderColor: "#929290",
    padding: "15@s",
    marginRight: "15@s",
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
    fontSize: "14@s",
    lineHeight: "14@s",
    color: CONTENT,
  },
});
