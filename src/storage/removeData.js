import AsyncStorage from "@react-native-async-storage/async-storage";

export default function removeData(key) {
	AsyncStorage.getItem(key).then((value) => {
		if (value !== null) {
			AsyncStorage.removeItem(key);
		}
	}
}