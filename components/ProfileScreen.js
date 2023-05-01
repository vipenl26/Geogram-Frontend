import {useEffect, useState} from 'react'
import { StyleSheet , View} from 'react-native'

import ProfileHeader from './ProfileHeader'
import ProfileElements from './ProfileElements'
import FriendIndicator from './FriendIndicator'
import { gql, useQuery } from '@apollo/client'
import SmallLoading from './SmallLoadingScreen'
import SessionTimeoutBox from './SessionTimeoutBox'

const get_profile_query = gql`
    query($id: String){
        getProfile(id: $id){bio, gender, fullName, username, isFriend, isPending}
    }

`
const ProfileScreen = function(superprops)
{
    let userid = null
    let isMyProfile = false
    if (superprops.route) {
        userid = superprops.route.params.id
    }
    else {
        userid = superprops.id
    }

    const {data, loading, error} = useQuery(get_profile_query, {
        variables: {id: userid}
    })

    
    if (loading) {
        return <SmallLoading/>
    }
    if (error) {
        if(error.toString().includes('401')) {
            return <SessionTimeoutBox/>
        }
        alert("error! check console")
        console.log(error)
    }
    

    const props = data.getProfile
    return(
        <View style = {styles.container}>
            {userid != null && <FriendIndicator isFriend={props.isFriend} isPending={props.isPending}/>}
            <ProfileHeader username={props.username} showAddFriendButton={!props.isFriend} userid={userid}/>
            <ProfileElements keytext={"Gender"} value ={props.gender}/>
            <ProfileElements keytext={"Bio"} value ={props.bio}/>
            <ProfileElements keytext={"Full Name"} value ={props.fullName}/>        
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