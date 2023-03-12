import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function Logo() {
	return (
		<View style={styles.container}>
			<Image source={require('../../assets/42logo.png')} style={styles.image} />
			<Text style={styles.header}> | Friends</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		justifyContent: 'center',
	},
	header: {
		fontSize: 30,
	},
	image: {
		width: 100,
		height: 100,
	},
});
