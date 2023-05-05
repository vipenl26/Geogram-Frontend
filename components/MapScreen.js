import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Button,
  Dimensions,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { Image } from "expo-image";

import * as Location from "expo-location";
const UPDATE_LOCATION_TIME_INTERVAL = process.env.REACT_APP_UPDATE_LOCATION_TIME_INTERVAL
import SmallLoading from "./SmallLoadingScreen";
import { useNavigation } from "@react-navigation/native";

const MapScreen = function ({radius, changeRadius, usersLocations, location, setLocation}) {
    const navigation = useNavigation()
const [isloading, setIsloading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null);

  const [pingLocation, setPingLocation] = useState(null);
  const url =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const { width, height } = Dimensions.get("window");
  const aspectRatio = width / height;
  const distanceDelta = Math.exp(Math.log(360) - 18 * Math.LN2);

  //Get other users Location
  // Handled in useEffect



  const updateMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        alert("location permission not granted")
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setPingLocation(loc);
    if (true) {
      // this condtion should check for displacement, because setLocation will recenter the map: VL
      setLocation(loc);
    }
  };

  useEffect(() => {
    setIsloading(true)
    updateMyLocation()
    setIsloading(false)
    setInterval(updateMyLocation, Number(UPDATE_LOCATION_TIME_INTERVAL))
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(location);
  }
  if (isloading) {
    return <SmallLoading/>
  }
  return (
    <View style={styles.mapScreen}>
      <Picker
        style={{ marginTop: 30 }}
        selectedValue={radius}
        onValueChange={(itemValue, itemIndex) => changeRadius(itemValue)}
      >
        <Picker.Item label="1" value={1} />
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
        <Picker.Item label="5" value={5} />
        <Picker.Item label="6" value={6} />
        <Picker.Item label="7" value={7} />
      </Picker>

      <MapView
        //broken (only apple)
        // userInterfaceStyle={"dark"}
        style={styles.map}
        region={{
          latitude: location == null ? 0 : location["coords"]["latitude"],
          longitude: location == null ? 180 : location["coords"]["longitude"],
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        // showsScale={true} // broken (only apple)
        // onRegionChangeComplete={(region) => setRegion(region)}
        zoomControlEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: location == null ? 0 : location["coords"]["latitude"],
            longitude: location == null ? 180 : location["coords"]["longitude"],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          pinColor="green"
        />

        {usersLocations.map((userLocation) => {
          return (
            <Marker
            key={userLocation.id}
            coordinate={{
            latitude:  userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={()=> { if(navigation.getId() != "Profile Page")navigation.push("Profile Page", {id: userLocation.id})}}   
          pinColor="red"
        />
          );
        })}

        {/* Circle radius */}
        <Circle
          center={{
            latitude: location == null ? 0 : location["coords"]["latitude"],
            longitude: location == null ? 180 : location["coords"]["longitude"],
          }}
          radius={radius * 300}
          strokeWidth={1}
          strokeColor="red"
          fillColor="transparent"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapScreen: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "90%",
  },
  profileView: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    padding: 5,
    margin: "2%",
    top: "6%",
    zIndex: 100,
    backgroundColor: "#fff",
    width: "96%",
    alignItems: "center",
  },
});

export default MapScreen;
