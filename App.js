import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// curl -X POST --data "grant_type=client_credentials&client_id=u-s4t2ud-fc93c0a48e6379841e1b7029403f55a8172a88d793fb6bf3d61c2c2decacb787&client_secret=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" https://api.intra.42.fr/oauth/token > token.txt

// {"access_token":"f93e4666545e0b233ebe1adb66b3e79289b88c81146656b19a7cd81b8448152a","token_type":"bearer","expires_in":7200,"scope":"public","created_at":1678551910}