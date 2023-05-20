import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { gql, useApolloClient } from '@apollo/client'
import SmallLoading from './SmallLoadingScreen'
const set_profile_mutation = gql`
mutation($profile: profileInput) {
	setProfile(profile: $profile){message}
}

`
const EditProfilePage = () => {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsloading] = useState(false)
  const client = useApolloClient()
  const handleSaveProfile = async() => {
    setIsloading(true)
    try {
    const result = await client.mutate({
      mutation: set_profile_mutation, 
      variables : {profile: {fullName: fullName == "" ? null : fullName,
                  bio: bio == "" ? null : bio,
                  gender: gender == "" ? null : gender,
                }}
    })
    if (result.errors) {
      console.log(result.errors)
      alert("error occured, check console")
      return
    }    

    if (result.data.setProfile.showMessage) {
      alert(result.data.setProfile.message)
    }}
    catch(e) {
      console.log(e)
    }
    finally{
    setIsloading(false)
    }
  };

  if (isLoading) {
    return <SmallLoading/>
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={text => setGender(text)}
      />

    <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={text => setBio(text)}
      />

    <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      
      <Button title="Save Profile" onPress={handleSaveProfile} color={'orange'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EditProfilePage;
