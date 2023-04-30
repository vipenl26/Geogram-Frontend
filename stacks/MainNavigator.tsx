import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ChatStack from './ChatStack'
import MainButton from '../components/MainButton';
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack';
import {StackEnum} from './StackEnum';
import LoadingScreen from '../components/LoadingScreen';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { gql,useQuery } from "@apollo/client";
import SmallLoading from '../components/SmallLoadingScreen';
import MessageBox from '../components/MessageBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FriendsStack from './FriendsStack';
const Tab = createBottomTabNavigator()


export default function MainNavigator() {
    let isLoggedin = true;
    const [accessToken, setAccessToken] = useState("somethin")
    const [currentStack, setCurrentStack] = useState(StackEnum.LoadingStack)
    const [messageBox, setMessageBox] = useState("")
    const loadingTime = 0;
    const [username , setUserName] = useState("llzero04")
    const [friends , setFriends] = useState([{name : "ZERO" , key : 0}])
    const [radius , setRadius] = useState(4);
    const [uid , setUID] = useState(0);
    const [userBio , setUserBio] = useState("User Bio");
    const [gender , setGender] = useState("Male")

    function changeRadius(rad : any)
    {
        setRadius(rad)
    }
    useEffect(() => {
        AsyncStorage.getItem('accessToken')
        .then((token) => {
            setAccessToken(token == null ? "": token)
            setTimeout(() => {
                setCurrentStack(token != null ? StackEnum.HomeStack: StackEnum.LoginStack)
            }, loadingTime)
        })
    }, [])
    useEffect(() => {
        if (accessToken == "") {
            setCurrentStack(StackEnum.LoginStack)
        }
        else {
            setCurrentStack(StackEnum.HomeStack)
        }
    }, [accessToken])

    const onSignupButton = () => {
        setCurrentStack(StackEnum.SignupStack)
    }
    const onLoginButton = () => {
        setCurrentStack(StackEnum.LoginStack)
    }
    const showMessageBox = (data: string) => {
        setMessageBox(data)
    }
    const logout = () => {
        setAccessToken("")
        AsyncStorage.removeItem('accessToken')
    }
    return (
        <>
            {/* {currentStack === StackEnum.LoginStack && <Login onSignup={onSignupButton} setAccessToken = {setAccessToken}/>}
            {currentStack === StackEnum.SignupStack && <Signup onLoginNavigation={onLoginButton}/>}
            {currentStack === StackEnum.LoadingStack && <LoadingScreen/>} */}
            {true && <HomeStack radius={radius} changeRadius={changeRadius}/>}
            {/* {currentStack === StackEnum.ChatStack && <ChatStack friends = {friends}/>}
            {currentStack === StackEnum.ProfileStack && <ProfileStack rootuser = {username} username={username} uid = {uid} userBio={userBio} gender = {gender} friends={friends}/>}
            {currentStack === StackEnum.FriendsStack && <FriendsStack/>}
            {currentStack === StackEnum.SettingsStack && <SettingsStack logout = {logout}/>}
            {accessToken != "" && <MainButton currentStack = {currentStack} setCurrentStack = {setCurrentStack}/>} */}
            
        </>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});