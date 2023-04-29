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
// @ts-ignore
import { gql,useQuery } from "@apollo/client";
import SmallLoading from '../components/SmallLoadingScreen';
import MessageBox from '../components/MessageBox';
const Tab = createBottomTabNavigator()


export default function MainNavigator() {
    let isLoggedin = false;
    const [accessToken, setAccessToken] = useState("")
    const [currentStack, setCurrentStack] = useState(StackEnum.LoadingStack)
    const [messageBox, setMessageBox] = useState("")
    const loadingTime = 0;
    const [username , setUserName] = useState("llzero04")
    const [friends , setFriends] = useState([{name : "ZERO" , key : 0}])
    const [radius , setRadius] = useState(4);
    const [uid , setUID] = useState(0);
    const [userBio , setUserBio] = useState("User Bio");

    function changeRadius(rad : any)
    {
        setRadius(rad)
    }
    useEffect(() => {
        setTimeout(() => {
            setCurrentStack(accessToken != "" ? StackEnum.HomeStack: StackEnum.LoginStack)
        }, loadingTime)
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
    const onSignup = (username: string, password: string, fullName: string) => {

    }
    const onLoginButton = () => {
        setCurrentStack(StackEnum.LoginStack)
    }
    const showMessageBox = (data: string) => {
        setMessageBox(data)
    }
    return (
        <>
            <MessageBox message={messageBox} setMessageBox={setMessageBox}/>
            {currentStack === StackEnum.LoginStack && <Login onSignup={onSignupButton} setAccessToken = {setAccessToken} showMessageBox={(s)=>showMessageBox(s)}/>}
            {currentStack === StackEnum.SignupStack && <Signup onSignup={onSignup} onLoginNavigation={onLoginButton}/>}
            {currentStack === StackEnum.LoadingStack && <LoadingScreen/>}
            {currentStack === StackEnum.HomeStack && <HomeStack radius={radius} changeRadius={changeRadius}/>}
            {currentStack === StackEnum.ChatStack && <ChatStack friends = {friends}/>}
            {currentStack === StackEnum.ProfileStack && <ProfileStack username={username} uid = {uid} userBio={userBio} friends={friends}/>}
            {currentStack === StackEnum.ChatStack && <ChatStack/>}
            {currentStack === StackEnum.ProfileStack && <ProfileStack/>}
            {currentStack === StackEnum.SettingsStack && <SettingsStack setAccessToken = {setAccessToken}/>}
            <MainButton currentStack = {currentStack} setCurrentStack = {setCurrentStack}/>
            
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