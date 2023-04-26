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
    const [currentStack, setCurrentStack] = useState(StackEnum.LoadingStack)
    const loadingTime = 5000;
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
        <View style = {styles.container}>
            {currentStack === StackEnum.LoginStack && <Login onLogin={onLogin} onSignup={onSignupButton}/>}
            {currentStack === StackEnum.SignupStack && <Signup onSignup={onSignup} onLoginNavigation={onLoginButton}/>}
            {currentStack === StackEnum.LoadingStack && <LoadingScreen/>}
            {currentStack === StackEnum.HomeStack && <HomeStack/>}
            {currentStack === StackEnum.ChatStack && <ChatStack/>}
            {currentStack === StackEnum.ProfileStack && <ProfileStack/>}
            {currentStack === StackEnum.SettingsStack && <SettingsStack/>}
            <MainButton currentStack = {currentStack} setCurrentStack = {setCurrentStack}/>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});