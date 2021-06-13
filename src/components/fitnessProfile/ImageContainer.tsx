import React, {useState} from "react";
import {
  Image,
  NativeScrollEvent,
  Text,
  ScrollView,
  TextStyle,
  View,
} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {ICONS, IMAGE_OVERLAY, WHITE} from "../../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import Constants from "expo-constants";
import {Entypo} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";

export default function ImageContainer({imageUrl}: {imageUrl: Array<string>}) {
  const [imageCount, setImageCount] = useState(1);
  //   const navigation = useNavigation();

  const imageChange = ({nativeEvent}: {nativeEvent: NativeScrollEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide < imageUrl.length) {
      setImageCount(slide + 1);
    } else {
      null;
    }
  };

  return (
    <View style={styles.imageContainer}>
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            height: scale(26),
            width: scale(26),
            backgroundColor: WHITE,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: APP_MARGIN_HORIZONTAL,
            marginTop: Constants.statusBarHeight,
            borderRadius: scale(13),
          }}
        >
          <Entypo
            name="cross"
            size={scale(20)}
            color={ICONS}
            // onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            onScroll={imageChange}
          >
            {imageUrl.map((image, index) => (
              <Image
                key={index}
                source={{uri: image}}
                style={{height: "100%", width: "100%", resizeMode: "cover"}}
              />
            ))}
          </ScrollView>
        </View>
        {/* Number of images */}
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            backgroundColor: "#767574",
            bottom: scale(15),
            right: scale(20),
            justifyContent: "center",
            alignContent: "center",
            padding: scale(5),
            borderRadius: scale(4),
          }}
        >
          <Text style={{color: WHITE, fontSize: scale(10)}}>
            {imageCount} / {imageUrl.length}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  imageContainer: {
    height: "275@s",
    width: "100%",
    backgroundColor: IMAGE_OVERLAY,
  },
});
