import {API, graphqlOperation, Storage} from "aws-amplify";
import {UPDATE_USER_DETAILS} from "../queries/mutation";
import config from "../../aws-exports";
import {homeScreen} from "../navigation/routes";
import {addUser} from "../redux/actions/actionCreator";
import {Alert} from "react-native";
import {Dispatch} from "react";
import {IUserState} from "../redux/reducers/userReducer";
import {NavigationProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export const updateUserDetails = async (
  name: string,
  setLoading: Dispatch<any>,
  user: IUserState,
  image: string,
  dispatch: Dispatch<any>,
  navigation: StackNavigationProp<any>,
) => {
  if (!name) {
    return Alert.alert("Please Enter some name");
  } else {
    let imageUrl = image;
    setLoading(true);
    try {
      if (user.imageUrl !== image) {
        const response = await fetch(image);
        const fileExt = image.substr(image.lastIndexOf(".") + 1);
        const blob = await response.blob();
        const s3Res = await Storage.put(
          `userProfile-${user.email}.${fileExt}`,
          blob,
          {
            contentType: "image/jpeg",
            // @ts-ignore
            progressCallback(progress) {
              console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            },
          },
        );

        // @ts-ignore
        imageUrl = `https://${config.aws_user_files_s3_bucket}.s3.ap-south-1.amazonaws.com/public/${s3Res.key}`;
      }

      await API.graphql(
        graphqlOperation(UPDATE_USER_DETAILS, {
          email: user.email,
          id: user.id,
          name,
          imageUrl,
        }),
      );

      dispatch(
        addUser({
          ...user,
          name,
          imageUrl,
        }),
      );

      setLoading(false);
      navigation.pop();
    } catch (error) {
      console.log("Some error occured while updating user details ", error);
    }
  }
};
