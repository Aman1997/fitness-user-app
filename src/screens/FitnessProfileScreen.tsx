import React from "react";
import {ScrollView, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {StatusBar} from "expo-status-bar";
import ImageContainer from "../components/fitnessProfile/ImageContainer";
import DetailsView from "../components/fitnessProfile/DetailsView";
import LocationView from "../components/fitnessProfile/LocationView";
import StudioPlans from "../components/fitnessProfile/StudioPlans";
import ReviewsContainer from "../components/fitnessProfile/ReviewsContainer";

const DATA = {
  imageUrl: [],
};

export default function FitnessProfileScreen() {
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <StatusBar style="light" />
        <ImageContainer imageUrl={DATA.imageUrl} />
        <DetailsView />
        <LocationView />
        <StudioPlans />
        <ReviewsContainer />
    </ScrollView>
  );
}

const styles = ScaledSheet.create({});
