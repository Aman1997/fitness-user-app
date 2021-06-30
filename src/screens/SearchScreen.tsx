import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {useEffect} from "react";
import {FlatList, Image, Text, View} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import {scale, ScaledSheet} from "react-native-size-matters";
import {useSelector} from "react-redux";
import {CONTENT} from "../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import AppSafeAreaView from "../components/common/AppSafeAreaView";
import AppSeparator from "../components/common/AppSeparator";
import MainCard from "../components/home/MainCard";
import NoPartnerData from "../components/home/NoPartnerData";
import Search from "../components/search/Search";
import {debounce} from "../helpers/debounce";
import {search} from "../helpers/search";
import {fitnessProfileScreen} from "../navigation/routes";
import {IUserState} from "../redux/reducers/userReducer";

export default function SearchScreen() {
  const navigation = useNavigation();

  const user = useSelector((state: {user: IUserState}) => state.user);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isTyping, setTyping] = useState(false);

  useEffect(() => {
    setSearchResults([]);
    setTyping(true);
    debounceSearch(
      searchValue,
      user,
      setSearchResults,
      navigation,
      setLoading,
      setTyping,
    );
  }, [searchValue]);

  const debounceSearch = debounce(search, 500);

  return (
    <AppSafeAreaView style={{flex: 1}}>
      <Search onTextChange={setSearchValue} name={searchValue} />
      <AppSeparator
        style={{
          marginTop: scale(15),
        }}
      />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : !searchValue ? (
        // Initial Search view
        <View style={styles.initialSearchView}>
          <Image
            source={require("../assets/images/SearchPageHuman.png")}
            style={styles.image}
          />
          <Text style={styles.initialSearchText}>
            Search 100+ gyms and yoga centers
          </Text>
        </View>
      ) : searchValue && searchResults.length < 1 && !isTyping ? (
        <NoPartnerData />
      ) : (
        //   Search results view
        <View style={styles.searchResultsView}>
          <View style={styles.cardContainer}>
            <FlatList
              data={searchResults}
              renderItem={({item}: {item: any}) => {
                return (
                  <MainCard
                    {...item}
                    coords={{
                      latitude: user.currentLat,
                      longitude: user.currentLong,
                    }}
                    onPressHandler={() =>
                      navigation.navigate(fitnessProfileScreen, {
                        // @ts-ignore
                        data: item,
                      })
                    }
                  />
                );
              }}
              // @ts-ignore
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={async () => {
                console.log("end reached");
              }}
              onEndReachedThreshold={0}
            />
          </View>
        </View>
      )}
    </AppSafeAreaView>
  );
}

const styles = ScaledSheet.create({
  searchResultsView: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: APP_MARGIN_HORIZONTAL,
    marginBottom: "20@s",
  },
  initialSearchView: {
    flex: 1,
    marginTop: "40%",
    alignItems: "center",
  },
  image: {
    height: "250@s",
    width: "270@s",
    resizeMode: "contain",
  },
  initialSearchText: {
    fontSize: "14@s",
    width: "50%",
    textAlign: "center",
    marginTop: "20@s",
    color: CONTENT,
  },
});
