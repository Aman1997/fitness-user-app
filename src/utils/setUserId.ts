import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserId = async (id: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('@user_id', id)
    } catch (e) {
        console.log('Error setting the current user id ', e)
    }
}

export default setUserId;