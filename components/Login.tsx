import React, { useEffect, useState} from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { gql, useApolloClient } from "@apollo/client";
import SmallLoading from './SmallLoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface LoginProps {
  onSignup: () => void;
  setAccessToken: (accessToken: string) => void
}
const login_query = gql`
query($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    message
    accessToken
    showMessage
  }
}
`


const Login: React.FC<LoginProps> = ({setAccessToken, onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsloading] = useState(false)
  const client = useApolloClient()

  const handleLogin = async() => {
    if (username == "" || password == "") {
      alert("username or password field is empty")
      return
    }
    setIsloading(true)
    const result = await client.query({
      query: login_query, 
      variables : {username: username, password: password}
    })    
    if (result.data.signIn.accessToken != null) {
      setAccessToken(result.data.signIn.accessToken)
      AsyncStorage.setItem('accessToken', result.data.signIn.accessToken)
    }
    if (result.data.signIn.showMessage) {
      alert(result.data.signIn.message)
    }
    setIsloading(false)
    
  };


  const handleSignup = () => {
    onSignup();
  };

  return (
    <View style={styles.container}>
      <SmallLoading isVisible={isloading} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.signupText}>Don't have an account?</Text>
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  signupText: {
    marginVertical: 10,
  },
});

export default Login;
