import React from "react";
import {Text, View, TouchableWithoutFeedback, Image} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT, PRIMARY} from "../../assets/constants/colors";
import {coords, findDistance} from "../../utils/findDistance";

interface IProps {
  imageUrl: Array<string>;
  name: string;
  ratings: string | null;
  plans: Array<{
    id: string;
    type: number;
    batch: number;
    timeSlotTo: string;
    timeSlotFrom: string;
    price: string;
    days: Array<number>;
  }>;
  coords: coords;
  latitude: string;
  longitude: string;
  onPressHandler: () => void;
}

export default function MainCard({
  imageUrl,
  name,
  ratings,
  plans,
  coords,
  latitude,
  longitude,
  onPressHandler,
}: IProps) {
  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <View style={styles.cardContainer}>
        <Image source={{uri: imageUrl[0]}} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            {ratings ? (
              <>
                <AntDesign name="star" size={scale(14)} color={PRIMARY} />
                <Text style={{paddingLeft: scale(5)}}>{ratings}/5.0</Text>{" "}
              </>
            ) : null}
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>
            {findDistance(coords, {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            }).toFixed(1)}{" "}
            kms away
          </Text>
          <Text style={styles.detailsText}>
            {plans.filter((plan) => plan.type === 0)[0].price} INR/day
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  cardContainer: {
    borderRadius: "20@s",
    elevation: 2,
    marginTop: "20@s",
    shadowColor: "#000",
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    height: "160@s",
    width: "100%",
    borderTopLeftRadius: "20@s",
    borderTopRightRadius: "20@s",
    resizeMode: "cover",
  },
  nameContainer: {
    flexDirection: "row",
    paddingHorizontal: "10@s",
    paddingTop: "10@s",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(243,243,243, 0.2)",
  },
  name: {
    fontSize: "14@s",
    fontWeight: "500",
    textTransform: "capitalize",
    color: HEAD_TEXT,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "10@s",
    paddingTop: "5@s",
    paddingBottom: "15@s",
    backgroundColor: "rgba(243,243,243, 0.2)",
    borderBottomLeftRadius: "20@s",
    borderBottomRightRadius: "20@s",
  },
  detailsText: {
    fontSize: "12@s",
    color: CONTENT,
  },
});
