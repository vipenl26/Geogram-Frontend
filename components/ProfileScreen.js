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
        getProfile(id: $id){bio, gender, fullName, username}
    }

`
const ProfileScreen = function(superprops)
{
    let userid = null
    let isMyProfile = false
    if (superprops.route) {
        userid = superprops.route.params.userid
    }
    else {
        userid = superprops.id
    }

    const {data, loading, error} = useQuery(get_profile_query, {
        variables: {id: userid}
    })

    

    if (error) {
        if(error.toString().includes('401')) {
            return <SessionTimeoutBox/>
        }
        alert("error! check console")
        console.log(error)
    }
    if (loading) {
        return <SmallLoading/>
    }

    const props = data.getProfile
    console.log(props)
    return(
        <View style = {styles.container}>
            {userid != null && <FriendIndicator isFriend={false} isPending={true}/>}
            <ProfileHeader username={props.username} showAddFriendButton={userid != null}/>
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