import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, Text, ScrollView } from 'react-native';
import SearchUser from './src/components/SearchUser';
import Logo from './src/components/Logo';
import Home from './src/components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
	return (
		<ScrollView>
			<Logo />
			<Home />
		</ScrollView>
	);
}

function SearchScreen() {
	return (
		<View>
		<SafeAreaView />
		<Logo />
		<SearchUser />
		<StatusBar style="auto" />
		</View>
	);
}
  
  function SettingsScreen() {
	return (
		<ScrollView>
			<Text>Emeği Geçenler: hbaygul, mdiraga</Text>
		</ScrollView>
	);
  }
  
  const Tab = createBottomTabNavigator();
  
  function MyTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Search" component={SearchScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
  }

export default function App() {
	return (
		<NavigationContainer>
    		<MyTabs />
    	</NavigationContainer>
	);
}