import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type Props = {
  onContinue: () => void;
};

export default function LandingScreen({ onContinue }: Props) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome to <Text style={{ color: colors.tint }}>RecipeMate</Text> 🍽️
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Create and store your favorite recipes — then with one tap, add all the ingredients straight to your shopping list.
        </Text>
      </View>
      <View style={styles.features}>
        <Text style={[styles.featureTitle, { color: colors.text }]}>How it works:</Text>
        <Text style={[styles.featureItem, { color: colors.text }]}>
          • In the <Text style={{ fontWeight: 'bold' }}>List</Text> tab, add single ingredients to build your shopping list manually.
        </Text>
        <Text style={[styles.featureItem, { color: colors.text }]}>
          • Or go to the <Text style={{ fontWeight: 'bold' }}>Recipes</Text> tab to create, save, and reuse full recipes.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 24,
  },
  heroContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: 200,
    height: 200,
  },
  contentContainer: {
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  features: {
    marginTop: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 15,
    marginBottom: 6,
    lineHeight: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
