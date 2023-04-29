import {StyleSheet, View, Text , FlatList , TouchableOpacity} from 'react-native'
import {useState , useEffect} from 'react'
import {Image} from 'expo-image'

const ChatFriendsScreen = function(props)
{
    const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
   
    return(
        <View style = {styles.friendScreen}>
            <Text style = {styles.header}>Friends</Text>
            <FlatList 
                data={props.friends}
                renderItem={({item}) => {return(
                    <TouchableOpacity onPress={(e) => {props.switchFriend(e , item.key)}} style = {styles.friendContainer} >
                        <Image
                            style = {styles.displayPicture}
                            source="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                            contentFit="cover"
                            transition={1000}
                            placeholder={blurhash}
                        />
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    friendScreen : {
        flex : 1
    },
    header : {
        margin : 5,
        color : "blue",
        fontWeight : "bold",
        fontSize : 20,
        borderBottomWidth : 2,
        borderBottomColor : "#333"
    },
    friendContainer : {
        margin : 3,
        borderWidth : 1,
        borderColor : "#333",
        padding : 3,
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        borderRadius : 2
    },
    displayPicture : {
        height : 30,
        width : 30,
        margin : 5,
        borderRadius : 20
    }
})

export default ChatFriendsScreen;