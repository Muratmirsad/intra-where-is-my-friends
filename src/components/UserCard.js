import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserCard({ user }) {
	const [isFriend, setIsFriend] = useState(false);

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

	_storeData = async () => {
		try {
			const value = await AsyncStorage.getItem('friends');
			if (value !== null) {
				let friends = JSON.parse(value);
				friends.push(user);
				await AsyncStorage.setItem('friends', JSON.stringify(friends));
			} else {
				await AsyncStorage.setItem('friends', JSON.stringify([user]));
			}
			setIsFriend(true);
		} catch (error) {
		}
	};

	_removeData = async () => {
		try {
			const value = await AsyncStorage.getItem('friends');
			if (value !== null) {
				let friends = JSON.parse(value);
				let newFriends = friends.filter((friend) => friend.login !== user.login);
				await AsyncStorage.setItem('friends', JSON.stringify(newFriends));
			}
			setIsFriend(false);
		} catch (error) {
		}
	};

	return (
		<View>
			{user ? (
				<View style={styles.card}>
					<Image
						style={styles.image}
						source={{ uri: user.image.link }}
					/>
					<Text style={styles.title}>{user.login}</Text>
					<Text style={styles.subtitle}>{user.usual_full_name}</Text>
					{ isFriend ? (
						<Button title="Remove Friend" onPress={_removeData} />
					) : (
						<Button title="Add Friend" onPress={_storeData} />
					)}
				</View>) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
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
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#888',
		marginBottom: 10,
	},
});
