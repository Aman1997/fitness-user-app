import React from "react";
import {Text, View, FlatList} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {HEAD_TEXT} from "../../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    imageUrl: "https://picsum.photos/30",
    name: "string",
    createdAt: "string",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    imageUrl: "https://picsum.photos/30",
    name: "string",
    createdAt: "string",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    imageUrl: "https://picsum.photos/30",
    name: "string",
    createdAt: "string",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    imageUrl: "https://picsum.photos/30",
    name: "string",
    createdAt: "string",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export default function ReviewsContainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Reviews</Text>
      {reviews.length === 0 ? (
        <Text style={{marginVertical: scale(12)}}>No reviews yet!</Text>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <ReviewCard
              reviewsData={item}
              //   onReviewSelected={() =>
              //     navigation.navigate("ReviewDetailsScreen", {
              //       reviews: reviews
              //     })
              //   }
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginHorizontal: APP_MARGIN_HORIZONTAL,
    marginBottom: "20@s",
  },
  headingText: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: "15@s",
    marginBottom: "25@s",
    color: HEAD_TEXT,
  },
});
