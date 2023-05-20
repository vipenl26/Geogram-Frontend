import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { gql, useApolloClient } from '@apollo/client';
const get_converstaion_query = gql`
query($id: String!){
	getConversation(receiverUserId: $id, limit: 100, offset:0, after: 0) {
		messageid
		messagedata
		incoming
		
	}
}
`
const send_message_mutation = gql`
mutation($id: String, $messagedata: String, $messagetimestamp: String){
  sendMessage(messagedata: $messagedata, receiverUserId: $id, messagetimestamp: $messagetimestamp)
}
`


const ChatScreen = (superprops) => {
  const flatListRef = useRef(null);
  const id = superprops.route.params.id

  const client = useApolloClient()

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const updateMessages = (setMessages) => {
    const result = client.query({
      query: get_converstaion_query,
      variables : {id: id}
    }).then((data) => {
      setMessages(data.data.getConversation)
    })
    
  }
  const scrollToBottom = () => {
    if (flatListRef.current == null)return
    flatListRef.current.scrollToEnd({ animated: true });
  };
  useEffect(() => {
    updateMessages(setMessages)
    setInterval(() => {
      // scrollToBottom()
      updateMessages(setMessages)
    }, 2);
  }, [])

  const handleSend = () => {
    const result = client.mutate({
      mutation: send_message_mutation,
      variables: {id: id, messagetimestamp: new Date().toISOString().slice(0, 19).replace('T', ' '), messagedata: inputText}
    })
    if (inputText.trim()) {
      const newMessage = {
        incoming: false,
        messagedata: inputText, 
      };
      // setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setInputText('');
    }
  };

  const renderMessage = (item) => {
    return (
    <View style={styles.messageContainer}>
      <View
        style={[
          styles.message,
          !item.item.incoming ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.item.messagedata}</Text>
      </View>
    </View>
  )};

  
  return (
    <View style={styles.container}>
      <FlatList
         ref={flatListRef}
        data={[...messages].reverse()}
        renderItem={renderMessage}
        keyExtractor={(item) => Math.random()}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  message: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#f7bc4f',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#CCCCCC',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7bc4f',
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: '#444444',
  },
});

export default ChatScreen;
