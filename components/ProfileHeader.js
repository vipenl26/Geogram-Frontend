import {StyleSheet, View, Text, Button} from 'react-native'
import {useEffect , useState} from 'react'
import { Image } from 'expo-image'
import SmallLoading from './SmallLoadingScreen'
import { useApolloClient, gql } from '@apollo/client'

const send_friend_request_mutation = gql`
mutation($id: String) {
	sendFriendRequest(id: $id) {
		message
        showMessage
	}
}
`

const unfriend_mutation = gql`
mutation($id: String) {
	unfriend(id: $id) {
		message
        showMessage
	}
}

`
const ProfileHeader = function(props)
{
    const [isloading, setIsloading] = useState(false)
    const client = useApolloClient()
    async function sendFriendRequest(){
        try{
            setIsloading(true)
            const response = await client.mutate({
                mutation: send_friend_request_mutation,
                variables: {id: props.userid}
            })
            setIsloading(false)
            if (response.error) {
                alert("error!, check console")
            }
            if (response.data.sendFriendRequest.showMessage) {
                alert(response.data.sendFriendRequest.message)
            }
        }
        catch(e) {

        }
    }
    async function unfriend() {
        try {
            setIsloading(true)
            const response = await client.mutate({
                mutation: unfriend_mutation, 
                variables: {id: props.userid}
            })
            setIsloading(false)
            if (response.error) {
                alert("error!, check console")
            }
            if (response.unfriend.showMessage) {
                alert(response.message)
            }
        }
        catch(e){

        }
    }

    return(
        <View style={styles.profilePageHeader}>
            {isloading && <SmallLoading/>}
            <Image 
                style={styles.profileImage}
                source={require('../assets/profile.png')}
                contentFit="cover"
            />
            <Text style={styles.profileName}>{props.username}</Text>
            <Text style={{marginLeft : "auto"}}>{" "}</Text>
            {props.userid!=null && props.showAddFriendButton && <Button title="Add Friend" onPress={() => sendFriendRequest()}></Button>}
            {props.userid!=null && !props.showAddFriendButton && <Button title="Unfriend" color="#ff9966" onPress={() => unfriend()}></Button>}
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