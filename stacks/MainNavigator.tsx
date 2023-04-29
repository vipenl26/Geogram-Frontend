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
const Tab = createBottomTabNavigator()


export default function MainNavigator() {
    let isLoggedin = false;
    const [currentStack, setCurrentStack] = useState(StackEnum.HomeStack)
    const loadingTime = 5000;
    const [username , setUserName] = useState("llzero04")
    const [friends , setFriends] = useState([{name : "ZERO" , key : 0} , {name : "llzero04" , key : 1}])
    const [radius , setRadius] = useState(4);
    const [uid , setUID] = useState(0);
    const [userBio , setUserBio] = useState("User Bio");

    function changeRadius(rad : any)
    {
        setRadius(rad)
    }

    useEffect(() => {
        setTimeout(() => {
            setCurrentStack(isLoggedin ? StackEnum.HomeStack: StackEnum.LoginStack)
        }, loadingTime)
    }, [])
    const onLogin = (username: string, password: string) => {
        console.log(username, password)
    }
    const onSignupButton = () => {
        setCurrentStack(StackEnum.SignupStack)
    }
    const onSignup = (username: string, password: string, fullName: string) => {

    }
    const onLoginButton = () => {
        setCurrentStack(StackEnum.LoginStack)
    }
    return (
        <>
            {currentStack === StackEnum.LoginStack && <Login onLogin={onLogin} onSignup={onSignupButton}/>}
            {currentStack === StackEnum.SignupStack && <Signup onSignup={onSignup} onLoginNavigation={onLoginButton}/>}
            {currentStack === StackEnum.LoadingStack && <LoadingScreen/>}
            {currentStack === StackEnum.HomeStack && <HomeStack radius={radius} changeRadius={changeRadius}/>}
            {currentStack === StackEnum.ChatStack && <ChatStack friends = {friends}/>}
            {currentStack === StackEnum.ProfileStack && <ProfileStack username={username} uid = {uid} userBio={userBio} friends={friends}/>}
            {currentStack === StackEnum.SettingsStack && <SettingsStack/>}
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