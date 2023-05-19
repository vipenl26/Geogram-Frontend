import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native'
import React, {useEffect , useState} from 'react'
import { Image } from 'expo-image';
import ProfileElements from '../components/ProfileElements';
import ProfileHeader from '../components/ProfileHeader';
import ProfileScreen from '../components/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import EditProfilePage from '../components/EditProfilePage';
const Stack = createNativeStackNavigator();

function ProfileStack() {

const ProfileWithProps = () => (<ProfileScreen/>)
  
return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="My Profile"
        component={ProfileWithProps}
        options={({navigation})=>({
          headerTitle: () => <Text style={styles.title}>My Profile</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
              <AntDesign name="edit" size={24} color="black" />
           </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfilePage}
        options={({navigation})=>({
          headerTitle: () => <Text style={styles.title}>Edit Profile</Text>,
        })}
      />

    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ProfileStack

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop : 50
    },
    profilePageHeader : {
        display : "flex",
        flexDirection : "row",
        padding : 10,
        borderBottomColor : "#000",
        borderBottomWidth : 2,
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
        alignItems : "center"
    },
    profileName : {
        fontSize : 25,
        margin : 5
    },
    profileImage : {
        width : 50,
        height : 50,
        borderRadius : 10,
        margin : 10
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
      },
  });