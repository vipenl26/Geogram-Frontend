import {StyleSheet, View, Text , FlatList , TouchableOpacity} from 'react-native'
import {useState , useEffect} from 'react'
import {Image} from 'expo-image'
import ChatFriendsScreen from '../components/ChatFriendsScreen'
import ChatMessagesScreen from '../components/ChatMessagesScreen'
// import { createStackNavigator } from 'react-navigation-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

export default function ChatStack(props : any) {
    const [messages , setMessages] = useState([[{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"},{sender : 0 , msg : "Hi ZERO"} , {sender : 1 , msg : "Hi llzero04"}]])
    const [selectedFriend , setSelectedFriend] = useState(-1);

    useEffect(() => {
        // TODO : Get messages from server
    } , [])
    
    function switchFriend(e : any , idx : any)
    {
        console.log(idx)
        setSelectedFriend(idx)
    }

    return (
        <View style = {styles.container}>
            { selectedFriend === -1 && <ChatFriendsScreen friends = {props.friends} switchFriend = {switchFriend}/> }
            { selectedFriend > -1 && <ChatMessagesScreen friends = {props.friends} messages={messages} selectedFriend = {selectedFriend} switchFriend = {switchFriend}/> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop : 50
    }
  });