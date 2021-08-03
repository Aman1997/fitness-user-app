import React, {Dispatch} from "react";
import {View, Text, Alert, Platform} from "react-native";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {TextInput} from "react-native-paper";
import {AirbnbRating, Rating} from "react-native-ratings";
import {scale, ScaledSheet} from "react-native-size-matters";
import {
  HEAD_TEXT,
  IMAGE_OVERLAY,
  LIGHT_GREY,
  OFF_WHITE,
  PAGE_TITLE_COLOR,
  PRIMARY,
  SECONDARY,
} from "../../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import AppButton from "../common/AppButton";
import AppSeparator from "../common/AppSeparator";

interface IProps {
  screen: number;
  setScreen: Dispatch<number>;
  onPressCancel: () => void;
  onPressNext: () => void;
  ratings: number;
  setRatings: Dispatch<number>;
  review: string;
  setReview: Dispatch<string>;
  bookings: object;
}

const ReviewContainer = ({
  bookings,
  screen,
  setScreen,
  onPressCancel,
  onPressNext,
  ratings,
  setRatings,
  review,
  setReview,
}: IProps) => {
  const onAddReview = () => {
    if (ratings < 1)
      return Alert.alert(
        // @ts-ignore
        `Please rate ${bookings?.fitnessService?.name} service.`,
      );
    setScreen(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.panelHandle} />

      <Text style={[styles.headText, {textAlign: "center"}]}>
        {/* @ts-ignore */}
        {`Help ${bookings?.fitnessService?.name} improve!`}
      </Text>

      <Text style={styles.descText}>
        {/* @ts-ignore */}
        {`Good or bad, dosen’t matter.\n Any feedback, as long as it constructive,\n is great and can help ${bookings?.fitnessService?.name} get better.`}
      </Text>

      <AppSeparator
        style={{
          backgroundColor: "#C4C4C4",
          height: scale(1),
          marginTop: scale(10),
          opacity: scale(0.5),
        }}
      />

      {screen === 0 ? (
        <>
          <Text
            style={[
              styles.descText,
              {
                fontSize: scale(15),
                color: HEAD_TEXT,
                marginTop: scale(10),
                lineHeight: scale(20),
                fontWeight: "500",
              },
            ]}
          >
            {/* @ts-ignore */}
            {`How would you rate ${bookings?.fitnessService?.name} service?`}
          </Text>

          <Rating
            type="custom"
            minValue={1}
            fractions={false}
            tintColor={OFF_WHITE}
            ratingColor={PRIMARY}
            startingValue={ratings}
            ratingBackgroundColor="#C4C4C4"
            imageSize={40}
            onFinishRating={(rating: number) => setRatings(rating)}
          />

          <AppSeparator
            style={{
              backgroundColor: "#C4C4C4",
              height: scale(1),
              marginTop: scale(10),
              opacity: scale(0.5),
            }}
          />

          <View style={{alignItems: "center", marginVertical: scale(12)}}>
            <TouchableWithoutFeedback onPress={onAddReview}>
              <View style={styles.reviewContainer}>
                <Text style={{fontSize: scale(14), color: PRIMARY}}>
                  + Add Review
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      ) : (
        <>
          <TextInput
            label="Write your review"
            mode="outlined"
            numberOfLines={10}
            multiline={true}
            value={review}
            onChangeText={(text) => setReview(text as string)}
            style={{
              marginVertical: scale(10),
              backgroundColor: "#fff",
              maxHeight: scale(120),
            }}
            theme={{colors: {primary: PRIMARY}}}
            returnKeyType="done"
          />
        </>
      )}

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: Platform.OS === 'android' ? scale(8) : scale(25),
        }}
      >
        <View
          style={{
            width: scale(120),
            borderWidth: scale(1),
            borderColor: SECONDARY,
            borderRadius: scale(20),
            marginRight: scale(25),
          }}
        >
          <AppButton
            text={screen === 0 ? "Cancel" : "Back"}
            containerStyle={{
              height: scale(40),
              justifyContent: "center",
              alignItems: "center",
            }}
            textStyle={{
              color: SECONDARY,
              fontSize: scale(14),
              fontWeight: "500",
            }}
            onPressHandle={onPressCancel}
          />
        </View>

        <AppButton
          text="Submit"
          containerStyle={{
            height: scale(40),
            width: scale(120),
            backgroundColor: SECONDARY,
            borderRadius: scale(20),
            justifyContent: "center",
            alignItems: "center",
          }}
          textStyle={{
            color: "#fff",
            fontSize: scale(14),
            fontWeight: "500",
          }}
          onPressHandle={onPressNext}
        />
      </View>
    </View>
  );
};

export default ReviewContainer;

const styles = ScaledSheet.create({
  container: {
    height: "100%",
    backgroundColor: OFF_WHITE,
    paddingHorizontal: APP_MARGIN_HORIZONTAL,
  },
  panelHandle: {
    marginTop: "10@s",
    alignSelf: "center",
    width: "30@s",
    height: "4@s",
    borderRadius: "3@s",
    backgroundColor: IMAGE_OVERLAY,
  },
  headText: {
    color: PAGE_TITLE_COLOR,
    fontSize: "22@s",
    fontWeight: "500",
    marginTop: "10@s",
  },
  descText: {
    color: LIGHT_GREY,
    marginVertical: "10@s",
    fontSize: "13@s",
    textAlign: "center",
  },
  reviewContainer: {
    padding: "5@s",
    justifyContent: "center",
  },
});
