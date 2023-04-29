import {StyleSheet, View, Text} from 'react-native'

import { Image } from 'expo-image';
import ProfileElements from '../components/ProfileElements';

export default function ProfileStack(props : any) {
    const url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    const userIDText = "User ID"
    return (
        <View style = {styles.container}>
            <View style={styles.profilePageHeader}>
                <Image 
                    style={styles.profileImage}
                    source={url}
                    contentFit="cover"
                />
                <Text style={styles.profileName}>{props.username}</Text>
            </View>

            <ProfileElements keytext={"Bio"} value ={props.userBio}/>
            <ProfileElements keytext={userIDText} value ={props.uid}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop : 50
    },
    profilePageHeader : {
        display : "flex",
        flexDirection : "row",
        padding : 10,
        borderBottomColor : "#000",
        borderBottomWidth : 2,
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
        alignItems : "center"
    },
    profileName : {
        fontSize : 25,
        margin : 5
    },
    profileImage : {
        width : 50,
        height : 50,
        borderRadius : 10,
        margin : 10
    }
  });