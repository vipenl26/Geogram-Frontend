import {} from 'react'
import { StyleSheet , View} from 'react-native'

import ProfileHeader from './ProfileHeader'
import ProfileElements from './ProfileElements'
import FriendIndicator from './FriendIndicator'
const ProfileScreen = function(superprops)
{   
    if (superprops.route) {
        const props = superprops.route.params
        return(
        <View style = {styles.container}>
            <FriendIndicator isFriend={false} isPending={true}/>
            <ProfileHeader rootuser = {props.username} username={props.username} friends={props.friends}/>
            <ProfileElements keytext={"User ID"} value ={props.uid}/>
            <ProfileElements keytext={"Gender"} value ={props.gender}/>
            <ProfileElements keytext={"Bio"} value ={props.userBio}/>
            <ProfileElements keytext={"Full Name"} value ={props.fullname}/>
            
        </View>
    )
    }

    const props = superprops
    return(
        <View style = {styles.container}>
            <ProfileHeader rootuser = {props.username} username={props.username} friends={props.friends}/>
            <ProfileElements keytext={"User ID"} value ={props.uid}/>
            <ProfileElements keytext={"Gender"} value ={props.gender}/>
            <ProfileElements keytext={"Bio"} value ={props.userBio}/>
            <ProfileElements keytext={"Full Name"} value ={props.fullname}/>
            
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop : 50
    },
})

export default ProfileScreen;