import React, {useEffect, useState, useReducer} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MainButton from './MainButton';
import MapScreen from './MapScreen';
import { gql, useApolloClient } from '@apollo/client';
//@ts-ignore
import {UPDATE_LOCATION_TIME_INTERVAL} from "@env"
const discover_people_query = gql`
query{
	discoverPeople{
		id
		longitude
		latitude
	}
}
`

const update_coordinates_mutation = gql`
mutation($latitude: String!, $longitude: String!, $discoverradius: String!){
  updateCoordinates(latitude: $latitude, longitude: $longitude,discoverradius: $discoverradius){
	message
  showMessage
}}
`
const reducer = (state, action) => {
  if (action.type == "update") {
    return {...action.data}
  }

  return state
}

// A.K.A MapPage
const HomePage = (props) =>{
  const client = useApolloClient()
  const [radius , setRadius] = useState(4);

  const [usersLocations, setUsersLocation] = useState([

  ]);
  
  const [location, dispatch] = useReducer(reducer, null)

  const discover_people = async() => {
    try {
      const response = await client.query({
        query: discover_people_query
      })
      if (response.errors) {
        alert("error!, check console")
        console.error(response.errors)
      }
      const ls = []
      for (const x in response.data.discoverPeople) {
        ls.push({
          id: response.data.discoverPeople[x].id,
          latitude: Number(response.data.discoverPeople[x].latitude), 
          longitude: Number(response.data.discoverPeople[x].longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })
      }
      
      setUsersLocation(ls)
    }
    catch(e) {
      console.log(e)
    }

  }
  const update_coordinates = async() => {
    if (location == null){ 
      return
    }
    try {
      const response = await client.mutate({
        mutation: update_coordinates_mutation,
        //@ts-ignore
        variables: {latitude: location["coords"]["latitude"]+"", longitude: location["coords"]["longitude"]+"", discoverradius: radius.toString()}
      })

      if (response.errors) {
        alert("error!, check console")
        console.error(response.errors)
      }

      if (response.data.updateCoordinates.showMessage) {
        alert(response.data.updateCoordinates.message)
      }
    }
    catch(e) {
      
    }
  }
  useEffect(() => {
    update_coordinates()
  }, [location])

  useEffect(() => {
    discover_people()
    setInterval(discover_people, Number(UPDATE_LOCATION_TIME_INTERVAL))
  }, [])

  const setLocation = (x) => {
    dispatch({type: "update", data: x})

  }
 return (
  <>
    <MapScreen radius={radius} changeRadius={setRadius} usersLocations={usersLocations} location={location} setLocation={setLocation}/>
  </>

 )
}


export default HomePage;
