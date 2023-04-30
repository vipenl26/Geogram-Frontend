import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'
import FriendsPage from '../components/FriendsPage';
import {useEffect} from 'react'
import FriendRequestsPage from '../components/FriendRequestsPage';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
// const screens = {
//   FriendsPage: {
//     screen: FriendsPage,
//     navigationOptions: {
//       title: "Friends",
//     }
//   },
//   FriendRequestsPage: {
//     screen: FriendRequestsPage,
//     navigationOptions: {
//       title: "Friend Requests",
//     }
//   }
// }


// const FriendsStack = createStackNavigator(screens)
const Stack = createNativeStackNavigator();
function FriendsStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Friends"
        component={FriendsPage}
        options={({navigation})=>({
          headerTitle: () => <Text style={styles.title}>Friends</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Friend Requests')}>
              <Ionicons name="ios-person-add" size={24} color="#000" />
           </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Friend Requests"
        component={FriendRequestsPage}
        options={{
          headerTitle: () => <Text style={styles.title}>Friend Requests</Text>
        }}
      />

    </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  friendsList: {
    padding: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
});


export default FriendsStack