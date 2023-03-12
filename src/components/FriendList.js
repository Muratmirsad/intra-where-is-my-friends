import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getData from '../storage/getData';


export default function FriendList({ user }) {
	const [friends, setFriends] = useState([]);
	const [isFriend, setIsFriend] = useState(false);

	const updateFriends = () => {
		getData('friends').then((friends) => {
			setFriends(friends);
		});
	};
	React.useEffect(() => {
		updateFriends();
	}, []);
	React.useEffect(() => {
		updateFriends();
	}, [friends]);

	_getData = async () => {
		try {
			const value = await AsyncStorage.getItem('friends');
			if (value !== null) {
				let friends = JSON.parse(value);
				let friend = friends.find((friend) => friend.login === user.login);
				if (friend) {
					setIsFriend(true);
				} else {
					setIsFriend(false);
				}
			} else {
				setIsFriend(false);
			}
		} catch (error) {
		}
	};

	const removeFriend = (friend) => {
		AsyncStorage.getItem('friends').then((friends) => {
			let friendsArray = JSON.parse(friends);
			let newFriendsArray = friendsArray.filter((f) => f.login !== friend.login);
			AsyncStorage.setItem('friends', JSON.stringify(newFriendsArray)).then(() => {
				updateFriends();
			});
		});
	};
	return (
		<View>
			{friends.length > 0 ? (
				friends.map((friend) => (
					<View key={friend.login} style={styles.card}>
						<Image
							style={styles.image}
							source={{ uri: friend.image.link }}
						/>
						<Text style={styles.title}>{friend.login}</Text>
						<Text style={styles.subtitle}>{friend.usual_full_name}</Text>
						<Button title="Open Notifications" onPress={() => {}} />
						<Button title="Remove" onPress={() => removeFriend(friend)} />
					</View>
				))
			) : (
				<Text style={styles.title}>No friends yet</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		marginTop: 20,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
		alignItems: 'center',
		width: 250,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 5,
	},
});
