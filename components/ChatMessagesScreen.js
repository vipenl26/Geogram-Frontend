import {StyleSheet, View, Text , FlatList , TouchableOpacity , BackHandler , Dimensions , Pressable, TextInput, Button} from 'react-native'
import {useState , useEffect} from 'react'
import {Image} from 'expo-image'
import ChatFriendsScreen from '../components/ChatFriendsScreen'

const ChatMessagesScreen = function(props)
{
    const width = Dimensions.get('window').width; //full width
    const height = Dimensions.get('window').height; //full height
    const [sendText , setSendText] = useState("");
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

      function sendMessage(e)
      {
        //TODO : Send Message
        console.log(sendText)
      }

      function goBackToFriendScreen(e)
      {
        props.switchFriend(e , -1)
      }

    const url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    return(
        <View style = {styles.messagesScreen}>
            <View style = {header}>
                {/* <Pressable onPress = {(e) => {goBackToFriendScreen(e)}}><Text style = {styles.backButtonbackButton}>{backButtonText}</Text></Pressable> */}
                <Image 
                    style={styles.profileImage}
                    source={url}
                    contentFit="cover"
                />
                <Text style = {styles.textheader}>{props.friends[props.selectedFriend].name}</Text>
            </View>
            <FlatList 
                data = {props.messages[props.selectedFriend]}
                renderItem={({item}) => {return(
                    <View>
                        {item.sender === 0 && <Text style = {styles.userMessage}>{item.msg}</Text>}
                        {item.sender === 1 && <Text style = {styles.friendMessage}>{item.msg}</Text>}
                    </View>
                )}}
            />
            <View style={styles.sendContainer}>
                <TextInput 
                    editable
                    onChangeText={text => setSendText(text)}
                    value={sendText}
                    style={{padding: 5 , borderColor : "#333" , borderWidth : 1 , width : '80%'}}
                />
                <Button title='Send' onPress={(e) => {sendMessage(e)}}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    messagesScreen : {
        flex : 1
    },
    profileImage : {
        width : 50,
        height : 50,
        borderRadius : 10,
        margin : 10
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
        backgroundColor : "whitesmoke",
        color : "#000",
        margin : 5,
        padding : 5,
        alignSelf : "flex-start"
    },
    sendContainer: {
        display: "flex",
        flexDirection : "row",
        alignItems : "center",
        padding : 5,
        justifyContent : "space-around"
    }
})

export default ChatMessagesScreen;