import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { gql, useApolloClient } from "@apollo/client";
import SmallLoading from './SmallLoadingScreen';
interface SignupProps {
  onLoginNavigation: () => void;
}
const signup_mutation = gql`
  mutation($username: String!, $password: String!){
    createNewUser(username: $username, password: $password){
    message
    showMessage
  }
  }
`
const Signup: React.FC<SignupProps> = ({onLoginNavigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isloading, setIsloading] = useState(false)
  const client = useApolloClient()
  const handleSignup = async() => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    if (username == "" || password == "") {
      alert("username or password field is empty")
      return
    }
    setIsloading(true)
    try {
      const response = await client.mutate({
        mutation: signup_mutation,
        variables : {username: username, password: password}
      })
      if (response.errors) {
        alert('error check console')
        console.log(response.errors)
      }
  
      if(response.data.createNewUser.showMessage) {
        alert(response.data.createNewUser.message)
      }
    }
    catch(e) {
      console.log(e)
    }
    finally{
      setIsloading(false)
    }

    
  };

  return (
    <View style={styles.container}>
      <SmallLoading isVisible={isloading}/>
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Signup" onPress={handleSignup} />
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Text style={styles.loginButton} onPress={onLoginNavigation}>
          Login
        </Text>
      </View>
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
  loginTextContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: 'gray',
  },
  loginButton: {
    fontWeight: 'bold',
  },
});

export default Signup;
