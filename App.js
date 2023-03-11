import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import SearchUser from './src/components/SearchUser';

export default function App() {
	return (
		<View style={styles.container}>
		<SafeAreaView />
		<SearchUser />
		<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// some styles
	},
});
