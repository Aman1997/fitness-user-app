import React, {useCallback, useMemo, useRef, useState} from "react";
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import ImageContainer from "../components/fitnessProfile/ImageContainer";
import DetailsView from "../components/fitnessProfile/DetailsView";
import LocationView from "../components/fitnessProfile/LocationView";
import StudioPlans from "../components/fitnessProfile/StudioPlans";
import ReviewsContainer from "../components/fitnessProfile/ReviewsContainer";
import {useRoute} from "@react-navigation/native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import BatchContainer from "../components/fitnessProfile/BatchContainer";
import {scale, ScaledSheet} from "react-native-size-matters";

const Data = [{}, {}];

export default function FitnessProfileScreen() {
  const [type, setType] = useState(0);

  const route = useRoute();
  // @ts-ignore
  const {data} = route.params;

  const sheetRef = React.useRef(null);

  return (
    <>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <StatusBar style="dark" />
        <ImageContainer imageUrl={data.imageUrl} />
        <DetailsView
          name={data.name}
          ratings={data.ratings}
          address={data.address}
          about={data.about}
        />
        <LocationView
          latitude={parseFloat(data.latitude)}
          longitude={parseFloat(data.longitude)}
        />
        <StudioPlans
          plans={data.plans}
          id={data.id}
          name={data.name}
          imageUrl={data.imageUrl[0]}
          ratings={data.ratings}
          address={data.address}
          setType={setType}
          // @ts-ignore
          onPress={() => sheetRef.current.snapTo(0)}
        />
        <ReviewsContainer id={data.id} />
      </ScrollView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={
          Data.length === 1 ? [scale(180), 0, 0] : [scale(350), scale(180), 0]
        }
        initialSnap={2}
        borderRadius={scale(20)}
        renderContent={() => <BatchContainer />}
      />
    </>
  );
}
