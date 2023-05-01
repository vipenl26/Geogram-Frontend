import { gql, useApolloClient, useQuery } from '@apollo/client';
import React, {useState} from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SmallLoading from './SmallLoadingScreen';
import SessionTimeoutBox from './SessionTimeoutBox';

interface FriendRequest {
  id: string;
  name: string;
}

const friendRequestsPage: FriendRequest[] = [
  { id: '1', name: 'Mary'},
  { id: '2', name: 'Mike' },
  { id: '3', name: 'Chris' },
];

interface FriendRequestsPageProps {
  navigation: any;
}
const get_all_requests_query = gql`
query {
	getAllFriendRequests(limit: 100, offset:0) {
    username, id
  }
}
`
const accept_friend_requet_mutation = gql`
mutation($id: String) {
	acceptFriendRequest(id: $id) {message, showMessage}
}
`

const reject_friend_requet_mutation = gql`
mutation($id: String) {
	rejectFriendRequest(id: $id) {message, showMessage}
}
`

const FriendRequestsPage: React.FC<FriendRequestsPageProps> = ({ navigation }) => {
  const {loading, data, error} = useQuery(get_all_requests_query)
  const client = useApolloClient()
  const [isloading, setIsloading] = useState(false)
  if (loading) {
    return <SmallLoading/>
  }
  if (error) {
      if(error.toString().includes('401')) {
          return <SessionTimeoutBox/>
      }
      alert("error! check console")
      console.log(error)
  }

  const acceptFriendRequest = async(id :any) => {

    try {
      setIsloading(true)
      const response = await client.mutate({
        mutation: accept_friend_requet_mutation, 
        variables: {id: id}
      })

      if (response.errors){
        alert("error!, checkout console")
        console.log(response.errors)
      }

      if (response.data.acceptFriendRequest.showMessage) {
        alert(response.data.acceptFriendRequest.message)
      }

      setIsloading(false)
    }
    catch(e) {

    }
    
  }

  const rejectFriendRequest = async(id: any) => {
    try {
      setIsloading(true)
      const response = await client.mutate({
        mutation: reject_friend_requet_mutation, 
        variables: {id: id}
      })

      if (response.errors){
        alert("error!, checkout console")
        console.log(response.errors)
      }

      if (response.data.acceptFriendRequest.showMessage) {
        alert(response.data.acceptFriendRequest.message)
      }

      setIsloading(false)
    }
    catch(e) {
      
    }
  }

  const renderRequest = ({ item }: { item: any }) => (
    <View style={styles.request}>
      {loading && <SmallLoading/>}
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.push('Friend Profile', {id: item.id})}>
        <Image source={require('../assets/profile.png')} style={styles.profileIcon} />
        <View style={styles.requestInfo}>
          <Text style={styles.name}>{item.username}</Text>
          <Text style={styles.status}>{"pending"}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.acceptButton} onPress={() => acceptFriendRequest(item.id)}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={() => rejectFriendRequest(item.id)}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.getAllFriendRequests}
        renderItem={renderRequest}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  list: {
    padding: 20,
  },
  request: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  profileIcon: {
    flex: 1,
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
  requestInfo: {
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
  actions: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FriendRequestsPage;
