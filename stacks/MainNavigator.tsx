import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, createContext, SetStateAction, Dispatch } from 'react';
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
interface MainNavigatorProps {
    accessToken: String
    setAccessToken: Dispatch<SetStateAction<string>>
}
export const AppContext = createContext({})
const MainNavigator:React.FC<MainNavigatorProps> = ({accessToken, setAccessToken}) => {
    let isLoggedin = true;
    
    const [currentStack, setCurrentStack] = useState(StackEnum.LoadingStack)
    const [messageBox, setMessageBox] = useState("")
    const loadingTime = 0;
    const [username , setUserName] = useState("llzero04")
    const [friends , setFriends] = useState([{name : "ZERO" , key : 0}])
    

    useEffect(() => {
        AsyncStorage.getItem('accessToken')
        .then((token) => {
            token="Something"
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
        <AppContext.Provider value={logout}>
            {currentStack === StackEnum.LoginStack && <Login onSignup={onSignupButton} setAccessToken = {setAccessToken}/>}
            {currentStack === StackEnum.SignupStack && <Signup onLoginNavigation={onLoginButton}/>}
            {currentStack === StackEnum.LoadingStack && <LoadingScreen/>}
            {currentStack === StackEnum.HomeStack && <HomeStack/>}
            {currentStack === StackEnum.ChatStack && <ChatStack friends = {friends}/>}
            {currentStack === StackEnum.ProfileStack && <ProfileStack/>}
            {currentStack === StackEnum.FriendsStack && <FriendsStack/>}
            {currentStack === StackEnum.SettingsStack && <SettingsStack logout = {logout}/>}
            {accessToken != "" && <MainButton currentStack = {currentStack} setCurrentStack = {setCurrentStack}/>}
            
        </AppContext.Provider>
    )
}
export default MainNavigator

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});