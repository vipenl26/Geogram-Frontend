import {StyleSheet, View, Text, Button} from 'react-native'
import {useEffect , useState} from 'react'
import { Image } from 'expo-image'

const ProfileHeader = function(props)
{
    const url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"

    function sendFriendRequest(id){
        //
    }

    return(
        <View style={styles.profilePageHeader}>
            <Image 
                style={styles.profileImage}
                source={url}
                contentFit="cover"
            />
            <Text style={styles.profileName}>{props.username}</Text>
            <Text style={{marginLeft : "auto"}}>{" "}</Text>
            {props.showAddFriendButton && <Button title="Add Friend" onPress={(e) => sendFriendRequest(e)}></Button>}
        </View>
    )
}

const styles = StyleSheet.create({
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
})

export default ProfileHeader;