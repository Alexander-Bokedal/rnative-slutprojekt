
import { View, StyleSheet } from 'react-native';
import ListView from '@/components/ListView';
export default function HomeScreen() {


  return (
    <View style={styles.container}>
      <ListView />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderWidth: 5,
    borderColor: 'white'
  }
})
