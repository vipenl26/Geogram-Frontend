import { Picker } from "@react-native-picker/picker";
import { useState , useEffect } from "react";
import { StyleSheet, Text, View , PermissionsAndroid , Button , Dimensions} from 'react-native';
import MapView, { Marker , Circle } from "react-native-maps";
import { Image } from 'expo-image';

import * as Location from 'expo-location';

const MapScreen = function(props)
{
    // useEffect(() => {
    //     requestLocationPermission()
    // } , [])

    // const requestLocationPermission = async () => {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           title: 'Geogram Location Permission',
    //           message:
    //             'Geogram needs access to your location ' +
    //             'so you can take make awesome friends.',
    //           buttonNeutral: 'Ask Me Later',
    //           buttonNegative: 'Cancel',
    //           buttonPositive: 'OK',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         console.log('You can use the camera');
    //       } else {
    //         console.log('Camera permission denied');
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   };

    const [usersLocations , setUsersLocation] = useState([{latitude: 17.37 , longitude: 78.5759843 , key : 0 , profileName : "ZERO"} , {latitude: 17.37 , longitude: 78.56598 , key : 1 , profileName : "llzero00"}]);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [profile , setProfile] = useState(null);
    
    const [pingLocation , setPingLocation] = useState(null);
    const url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    
    const { width, height } = Dimensions.get('window');
    const aspectRatio = width / height;
    const distanceDelta = Math.exp(Math.log(360) - 18 * Math.LN2)

    //Get other users Location
    // Handled in useEffect

    //Send a http request to send friend request
    function setProfileIdx(e , key)
    {
        // if(radius * 300 <= Math.abs(Math.abs(location["coords"]["latitude"] - usersLocations[key].latitude , 2) + Math.abs(location["coords"]["longitude"] - usersLocations[key].longitude , 2)))
        //     return;
        setProfile(key);
        console.log(key)
    }
    
    function sendFriendRequest(e)
    {
        console.log(props.username)
    }

    // setInterval(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             setErrorMsg('Permission to access location was denied');
    //             return;
    //         }
    
    //         let loc = await Location.getCurrentPositionAsync({});
    //         setLocation(loc);
    //         })();
    // } , 2000)

    useEffect(() => {
        setTimeout(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        })();} , 5000)

        // Get other users locations and profiles from backend
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        console.log(location)
    }

    return(
        <View style = {styles.mapScreen}>
            <Picker 
                style={{marginTop : 30}}
                selectedValue={props.radius}
                onValueChange={(itemValue, itemIndex) =>
                    props.changeRadius(itemValue)}>
                <Picker.Item label="4" value={4}/>
                <Picker.Item label="5" value={5}/>
                <Picker.Item label="6" value={6}/>
                <Picker.Item label="7" value={7}/>
                <Picker.Item label="8" value={8}/>
                <Picker.Item label="9" value={9}/>
            </Picker>

            
            {profile != null && <View style = {styles.profileView}>
                {/* <Image source={"https://picsum.photos/seed/696/3000/2000"} style={{width : 50 , height : 50 , borderRadius : 10}} placeholder={blurhash}/> */}
                <Image 
                    source={url}
                    contentFit="cover"
                    placeholder={blurhash}
                    style={{width : 50 , height : 50 , borderRadius : 10 , margin: 5}}
                />
                <Text style={{margin : 5 , fontSize : 20 , fontWeight : "bold"}}>{usersLocations[profile].profileName}</Text>
                <Text style={{marginLeft : "auto"}}> </Text>
                <Button title="Add Friend" onPress={(e) => sendFriendRequest(e)}></Button>
            </View>}

            <MapView 
                //broken (only apple)
                // userInterfaceStyle={"dark"}
                style = {styles.map}
                region={{
                    latitude : location == null ? 0 : location["coords"]["latitude"],
                    longitude : location == null ? 180 : location["coords"]["longitude"],
                    latitudeDelta: 0.0050,
                    longitudeDelta: 0.0050
                }}
                // showsScale={true} // broken (only apple)
                // onRegionChangeComplete={(region) => setRegion(region)}
                zoomControlEnabled = {true}
            >
                <Marker coordinate = {{
                    latitude : location == null ? 0 : location["coords"]["latitude"],
                    longitude : location == null ? 180 : location["coords"]["longitude"],
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,}}
                    pinColor="green"/>
                {usersLocations.map((userLocation) => {
                    return(
                        // <Marker key={userLocation.key} coordinate={userLocation} image={url} style={{height: 35, width:35, resizeMode:"contain" }}>
                        // </Marker>
                        <Marker key={userLocation.key} coordinate={userLocation} onPress={(e) => {setProfileIdx(e , userLocation.key)}}>
                        </Marker>
                    )
                })}

                {/* Circle radius */}
                <Circle
                    center={{
                    latitude: location == null ? 0 : location["coords"]["latitude"],
                    longitude: location == null ? 180 : location["coords"]["longitude"],
                    }}
                    radius={props.radius * 300}
                    strokeWidth={1}
                    strokeColor="red"
                    fillColor="transparent"
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapScreen : {
        flex : 1
    },
    map : {
        width: '100%',
        height: '95%'
    },
    profileView : {
        position : "absolute",
        display : "flex",
        flexDirection: "row",
        padding : 5,
        margin: '2%',
        top : '6%',
        zIndex : 100,
        backgroundColor : "#fff",
        width : '96%',
        alignItems : "center"
    }
})

export default MapScreen;