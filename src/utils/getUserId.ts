import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserId = async (): Promise<string | undefined> => {
    try {
      const value = await AsyncStorage.getItem('@user_id')
      if(value !== null) {
        // value previously stored
        return value;
      }
    } catch(e) {
      console.log('Error getting the current user id', e)
    }
  }
export default getUserId;  


  