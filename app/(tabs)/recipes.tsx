import { View, Text, StyleSheet } from 'react-native';


export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Recipes </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
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
});
