import AsyncStorage from "@react-native-async-storage/async-storage";

const removeUserId = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("@user_id");
  } catch (e) {
    console.log("Error removing the current user id ", e);
  }
};

export default removeUserId;
