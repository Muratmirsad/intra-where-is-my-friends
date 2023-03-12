import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getData from '../storage/getData';
import FriendList from './FriendList';
import refreshPageOnScroll from '../refreshPageOnScroll';

export default function Home()
{
	const [friends, setFriends] = useState([]);
	const updateFriends = () => {
		getData('friends').then((friends) => {
			setFriends(friends);
		});
	};
	/*
	React.useEffect(() => {
		updateFriends();
	}, []);
	React.useEffect(() => {
		updateFriends();
	}, [friends]);*/
	
	
	return(
		<View style={styles.container}>
			<FriendList />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 5,
	},
});