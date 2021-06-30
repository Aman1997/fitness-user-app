import React, {useState, useEffect} from "react";
import {FlatList, Text, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {RadioButton} from "react-native-paper";
import {scale, ScaledSheet} from "react-native-size-matters";
import {ICONS, PRIMARY} from "../../assets/constants/colors";
import {capitalize} from "../../utils/capitalize";
import {fetchAvailableCities} from "../../helpers/fetchAvailableCities";
import {useNavigation} from "@react-navigation/native";

interface IProps {
  onCancel: () => void;
  city: string;
  setUserCity: (city: string) => void;
}

export default function LocationChange({onCancel, city, setUserCity}: IProps) {
  const [cities, setCities] = useState<Array<string>>([]);
  const onLocationSelect = (city: string) => {
    setUserCity(city);
  };

  const navigation = useNavigation();

  useEffect(() => {
    (async () => setCities(await fetchAvailableCities(navigation)))();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Entypo
            name="cross"
            size={scale(22)}
            color={ICONS}
            style={styles.closeIcon}
            onPress={onCancel}
          />
          <Text
            style={{
              fontWeight: "500",
              marginVertical: scale(15),
              fontSize: scale(15),
              alignSelf: "center",
            }}
          >
            Select Location
          </Text>
          <RadioButton.Group
            onValueChange={(value) => onLocationSelect(value)}
            value={city}
          >
            <FlatList
              data={cities}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <RadioButton.Item
                  label={capitalize(item)}
                  value={item}
                  color={PRIMARY}
                  labelStyle={{color: ICONS}}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </RadioButton.Group>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(49,50,54, 0.6)",
  },
  modalView: {
    width: "80%",
    margin: "20@s",
    backgroundColor: "white",
    borderRadius: "20@s",
    padding: "20@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    left: "15@s",
    top: "15@s",
  },
});
