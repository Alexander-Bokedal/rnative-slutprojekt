
import { View, Platform, Text, StyleSheet } from 'react-native';
import ListView from '@/components/ListView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
export default function HomeScreen() {

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}> Hello world </Text>
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
