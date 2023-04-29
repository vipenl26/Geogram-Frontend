// import {StyleSheet, View, Text , FlatList , TouchableOpacity , BackHandler , Dimensions , Pressable} from 'react-native'
// import {useState , useEffect} from 'react'
// import {Image} from 'expo-image'
// import ChatFriendsScreen from '../components/ChatFriendsScreen'

// const ChatMessagesScreen = function(props)
// {
//     const width = Dimensions.get('window').width; //full width
//     const height = Dimensions.get('window').height; //full height
//     const header = {
//         display : "flex",
//         flexDirection : "row",
//         alignItems : "center",
//         width : width
//     }
//     const backButtonText = "<=";
    // useEffect(() => {

    //     // props.switchFriend(-1)
    //     const backAction = () => {
    //     //   props.switchFriend(-1)
    //     // console.log("temp")
    //       return true;
    //     };
    //     const backHandler = BackHandler.addEventListener(
    //       'hardwareBackPress',
    //       backAction,
    //     );
    //     console.log(props.messages)
    //     return () => backHandler.remove();
    //   }, []);
//       function goBackToFriendScreen(e)
//       {
//         props.switchFriend(-1)
//       }
//     return(
//         <View style = {styles.messagesScreen}>
//             <View style = {header}>
//                 <Pressable onPress = {(e) => {goBackToFriendScreen(e)}}><Text style = {styles.backButtonbackButton}>{backButtonText}</Text></Pressable>
//                 <Text style = {styles.textheader}>{props.friends[props.selectedFriend].name}</Text>
//             </View>
//             <FlatList 
//                 data = {props.messages[props.selectedFriend]}
//                 renderItem={({item}) => {return(
//                     <View>
//                         {item.sender === 0 && <Text style = {styles.userMessage}>{item.msg}</Text>}
//                         {item.sender === 0 && <Text style = {styles.friendMessage}>{item.msg}</Text>}
//                     </View>
//                 )}}
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
    
//     messagesScreen : {
//         flex : 1
//     },
//     header : {
//         display : "flex",
//         flexDirection : "row",
//         alignItems : "center",
//     },
//     backButton : {
//         fontSize : 40,
//         margin : 5,
//     },
//     textheader : {
//         margin : 5,
//         color : "blue",
//         fontWeight : "bold",
//         fontSize : 20,
//         borderBottomWidth : 2,
//         borderBottomColor : "#333"
//     },
//     userMessage : {
//         display : "flex",
//         backgroundColor : "lime",
//         color: "#000",
//         margin : 5,
//         padding : 5,
//         alignSelf : "flex-end"
//     },
//     friendMessage : {
//         display : "flex",
//         flexBasis : "auto",
//         backgroundColor : "aqua",
//         color : "#000",
//         margin : 5,
//         padding : 5,
//         alignSelf : "flex-start"
//     }
// })

// export default ChatMessagesScreen;

import {StyleSheet, View, Text , FlatList , TouchableOpacity , BackHandler , Dimensions , Pressable} from 'react-native'
import {useState , useEffect} from 'react'
import {Image} from 'expo-image'
import ChatFriendsScreen from '../components/ChatFriendsScreen'

const ChatMessagesScreen = function(props)
{
    const width = Dimensions.get('window').width; //full width
    const height = Dimensions.get('window').height; //full height
    const header = {
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        width : width
    }
    const backButtonText = "<=";

    useEffect(() => {
        const backAction = (e) => {
          props.switchFriend(e , -1)
            // console.log("back");
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
        console.log(props.messages)
        return () => backHandler.remove();
      }, []);

      function goBackToFriendScreen(e)
      {
        props.switchFriend(e , -1)
      }

    return(
        <View style = {styles.messagesScreen}>
            <View style = {header}>
                <Pressable onPress = {(e) => {goBackToFriendScreen(e)}}><Text style = {styles.backButtonbackButton}>{backButtonText}</Text></Pressable>
                <Text style = {styles.textheader}>{props.friends[props.selectedFriend].name}</Text>
            </View>
            <FlatList 
                data = {props.messages[props.selectedFriend]}
                renderItem={({item}) => {return(
                    <View>
                        {item.sender === 0 && <Text style = {styles.userMessage}>{item.msg}</Text>}
                        {item.sender === 0 && <Text style = {styles.friendMessage}>{item.msg}</Text>}
                    </View>
                )}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
    messagesScreen : {
        flex : 1
    },
    header : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
    },
    backButton : {
        fontSize : 20,
        margin : 5,
    },
    textheader : {
        margin : 5,
        color : "blue",
        fontWeight : "bold",
        fontSize : 20,
        borderBottomWidth : 2,
        borderBottomColor : "#333"
    },
    userMessage : {
        display : "flex",
        backgroundColor : "lime",
        color: "#000",
        margin : 5,
        padding : 5,
        alignSelf : "flex-end"
    },
    friendMessage : {
        display : "flex",
        flexBasis : "auto",
        backgroundColor : "aqua",
        color : "#000",
        margin : 5,
        padding : 5,
        alignSelf : "flex-start"
    }
})

export default ChatMessagesScreen;