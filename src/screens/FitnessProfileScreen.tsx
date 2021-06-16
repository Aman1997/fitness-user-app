import React from "react";
import {ScrollView} from "react-native";
import {ScaledSheet} from "react-native-size-matters";
import {StatusBar} from "expo-status-bar";
import ImageContainer from "../components/fitnessProfile/ImageContainer";
import DetailsView from "../components/fitnessProfile/DetailsView";
import LocationView from "../components/fitnessProfile/LocationView";
import StudioPlans from "../components/fitnessProfile/StudioPlans";
import ReviewsContainer from "../components/fitnessProfile/ReviewsContainer";
import {useRoute} from "@react-navigation/native";


export default function FitnessProfileScreen() {
  const route = useRoute();
  // @ts-ignore
  const {data} = route.params;

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
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
      />
      <ReviewsContainer id={data.id} />
    </ScrollView>
  );
}

const styles = ScaledSheet.create({});
