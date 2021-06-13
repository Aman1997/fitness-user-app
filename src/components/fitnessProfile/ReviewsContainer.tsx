import {API, graphqlOperation} from "aws-amplify";
import React, {useState} from "react";
import {useEffect} from "react";
import {Text, View, FlatList} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {HEAD_TEXT} from "../../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import {FETCH_REVIEWS} from "../../queries/query";
import ReviewCard from "./ReviewCard";

export default function ReviewsContainer({id}: {id: string}) {
  const [reviews, setReviews] = useState<
    Array<{
      imageUrl: string;
      name: string;
      createdAt: string;
      review: string;
    }>
  >([{imageUrl: "", name: "", createdAt: "", review: ""}]);
  useEffect(() => {
    (async () => {
      try {
        const reviewRes = await API.graphql(
          graphqlOperation(FETCH_REVIEWS, {id}),
        );
        // @ts-ignore
        const requiredData = reviewRes.data.getFitnessService.reviews.items;
        console.log(requiredData)
        setReviews(
          // @ts-ignore
          requiredData.map((item) => ({
            imageUrl: item.user.items[0].imageUrl,
            name: item.user.items[0].name,
            createdAt: item.createdAt,
            review: item.review,
          })),
        );
      } catch (error) {
        console.log("Some error occured while fetching reviews ", error);
      }
    })();
  }, []);

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
