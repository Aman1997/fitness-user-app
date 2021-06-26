import React, {useEffect, useState} from "react";
import {Image, View, Alert} from "react-native";
import {CONTENT_CONTAINER} from "../assets/constants/styles";
import AppHeaderBack from "../components/common/AppHeaderBack";
import AppPageTitle from "../components/common/AppPageTitle";
import {TextInput} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import {scale, ScaledSheet} from "react-native-size-matters";
import {PRIMARY, SECONDARY, WHITE} from "../assets/constants/colors";
import AppButton from "../components/common/AppButton";
import {useDispatch, useSelector} from "react-redux";
import {IUserState} from "../redux/reducers/userReducer";
import * as ImagePicker from "expo-image-picker";
import LoadingIndicator from "../components/common/LoadingIndicator";
import {useNavigation} from "@react-navigation/core";
import {updateUserDetails} from "../helpers/updateUserDetails";
import { StackNavigationProp } from "@react-navigation/stack";

const EditProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const dispatch = useDispatch();

  const user = useSelector((state: {user: IUserState}) => state.user);

  useEffect(() => {
    setName(user.name as string);
    setEmail(user.email as string);
    setImage(user.imageUrl as string);
  }, [user]);

  // request permission for media
  const requestPermissions = async () => {
    const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission denied",
        "You need to allow access to upload image. Please go to settings and allow access to photos",
        [{text: "OK", onPress: () => null}],
        {cancelable: false},
      );
    }
  };

  // selecting the images
  const selectImage = async () => {
    requestPermissions();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
      exif: true,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={{flex: 1}}>
          <AppHeaderBack />
          <View style={CONTENT_CONTAINER}>
            <AppPageTitle pageTitle="Edit Profile" />
            <View style={{alignItems: "center", flex: 1}}>
              <View style={{marginVertical: 20}}>
                <Image
                  source={{
                    uri: image,
                  }}
                  style={styles.profileImage}
                />
                <MaterialIcons
                  name="add-a-photo"
                  size={scale(22)}
                  color={WHITE}
                  style={styles.profileImageEdit}
                  onPress={selectImage}
                />
              </View>
              <TextInput
                label="Name"
                value={name}
                mode="outlined"
                onChangeText={(text) => setName(text)}
                style={{
                  backgroundColor: WHITE,
                  width: "100%",
                  marginVertical: scale(10),
                }}
                theme={{colors: {primary: PRIMARY}}}
              />
              <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  backgroundColor: WHITE,
                  width: "100%",
                  marginVertical: 10,
                }}
                theme={{colors: {primary: PRIMARY}}}
                disabled
              />
              <View
                style={{
                  position: "absolute",
                  alignItems: "center",
                  width: "100%",
                  bottom: scale(20),
                }}
              >
                <AppButton
                  text="Update"
                  textStyle={{
                    color: WHITE,
                    fontWeight: "500",
                    fontSize: scale(16),
                  }}
                  containerStyle={{
                    backgroundColor: SECONDARY,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: scale(20),
                    paddingVertical: scale(12),
                    borderRadius: scale(22),
                    marginTop: scale(50),
                    width: "100%",
                  }}
                  onPressHandle={() =>
                    updateUserDetails(
                      name,
                      setLoading,
                      user,
                      image,
                      dispatch,
                      navigation,
                    )
                  }
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default EditProfileScreen;

const styles = ScaledSheet.create({
  profileImage: {
    height: "110@s",
    width: "110@s",
    borderRadius: "55@s",
  },
  profileImageEdit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: SECONDARY,
    borderRadius: "20@s",
    padding: "5@s",
  },
});
